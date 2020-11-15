import "../sass/styles.scss";

import axios from "axios";

$(document).ready(function() {
  let isLoadingProperties = false;
  let token = null;
  let listings = [];
  let totalListings = 0;
  let vr;
  let vr_open = false;

  let limit = 20;
  let offset = 0;
  let counter = 0;

  let card_name;
  let card_number = 0;
  let card_id = 0;
  let vr_number = 0;

  let category,
    subcategory,
    suburbs,
    bedrooms,
    bathrooms,
    garage,
    min_land_size,
    max_land_size,
    min_price,
    max_price;

  /**
   *
   * Taking URL values to pass as criteria in the API request
   */
  category = getAllUrlParams().category;
  subcategory = getAllUrlParams().subcategory;
  if (category === "residential_rental") {
    switch (subcategory) {
      case "455":
        subcategory = "471";
        break;
      case "459":
        subcategory = "475";
        break;
      case "456":
        subcategory = "472";
        break;
      case "460":
        subcategory = "476";
        break;
      case "458":
        subcategory = "474";
        break;
      case "461":
        subcategory = "477";
        break;
      case "457":
        subcategory = "473";
        break;
      case "467":
        subcategory = "483";
        break;
      case "470":
        subcategory = "486";
        break;
    }
  }
  suburbs = getAllUrlParams().suburbs;
  bedrooms = getAllUrlParams().bedrooms;
  bathrooms = getAllUrlParams().bathrooms;
  garage = getAllUrlParams().garage;
  min_land_size = getAllUrlParams().min_land_size;
  max_land_size = getAllUrlParams().max_land_size;
  min_price = getAllUrlParams().min_price;
  max_price = getAllUrlParams().max_price;

  /**
   *
   * Function to load properties
   */
  var loadProperties = function() {
    isLoadingProperties = true;
    return axios
      .post("https://api.rexsoftware.com/v1/rex/authentication::login", {
        email: "itsupport@kindred.com.au",
        password: "LBzVkajepE8q"
      })
      .then(function(res) {
        token = res.data.result;
        return token;
      })

      .catch(function(err) {
        console.log(err);
      })
      .then(token => {
        const criteria = [
          {
            name: "listing.publish_to_external",
            value: "1"
          },
          {
            name: "system_listing_state",
            value: "current"
          }
        ];
        if (category) {
          criteria.push({
            name: "listing_category_id",
            value: category
          });
        }
        if (subcategory) {
          criteria.push({
            name: "listing.subcategories",
            type: "intersect_any",
            value: [subcategory]
          });
        }
        if (suburbs) {
          criteria.push({
            name: "property.adr_suburb_or_town",
            value: suburbs
          });
        }
        if (bedrooms) {
          criteria.push({
            name: "property.attr_bedrooms",
            value: bedrooms
          });
        }
        if (bathrooms) {
          criteria.push({
            name: "property.attr_bathrooms",
            value: bathrooms
          });
        }
        if (garage) {
          criteria.push({
            name: "property.attr_garages",
            value: garage
          });
        }
        if (min_land_size && max_land_size) {
          criteria.push({
            name: "property.attr_landarea_m2",
            type: "between",
            value: [min_land_size, max_land_size]
          });
        }
        if (min_price && max_price) {
          criteria.push({
            name: "listing.price_match",
            type: "between",
            value: [min_price, max_price]
          });
        }

        return axios
          .post(
            "https://api.rexsoftware.com/v1/rex/publishedListings::search?result_format=etags",
            {
              offset: offset,
              limit: limit,
              extra_options: {
                extra_fields: [
                  "advert_internet",
                  "allowances",
                  "documents",
                  "epc",
                  "events",
                  "features",
                  "floorplans",
                  "highlights",
                  "idealfors",
                  "images",
                  "links",
                  "meta",
                  "related_listing",
                  "rooms",
                  "rural",
                  "subcategories",
                  "views"
                ],
                search_arguments: {
                  result_format: "website_overrides_applied"
                }
              },
              criteria
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(function(res) {
            listings = [...listings, ...res.data.result.rows];
            totalListings = res.data.result.total;

            const newListings = res.data.result.rows;
            totalListings = res.data.result.total;

            newListings.forEach((listing, i) => {
              const {
                id,
                images,
                address: { suburb_or_town },
                price_advertise_as,
                attributes: { bedrooms, bathrooms },
                links
              } = listing;

              if (links.length > 0) {
                links.forEach(function(item) {
                  if (
                    item.link_type === "virtual_tour" &&
                    item.link_url.startsWith(
                      "https://kindred-property-group.captur3d.io"
                    )
                  ) {
                    vr = true;
                  }
                });
              }

              let bed_icon_src =
                "/wp-content/themes/kindred/dist/img/compressed/bed_icon.png";
              let bath_icon_src =
                "/wp-content/themes/kindred/dist/img/compressed/bath_icon.png";
              let vr_icon_src =
                "/wp-content/themes/kindred/dist/img/compressed/vr-512.png";

              var card__html =
                '<a id="card-' +
                id +
                '" name="' +
                card_number++ +
                '"><div class="card"><div class="card__image"><img src=' +
                images[0].url +
                "></img></div><p>" +
                suburb_or_town.toUpperCase() +
                "</p><p>" +
                price_advertise_as +
                "</p>" +
                '<div style="display: inline-flex;"><p><img id="bed_icon" class="icon" src="' +
                bed_icon_src +
                '">' +
                (bedrooms !== null ? bedrooms : 0) +
                "</i></p>" +
                '<p><img id="bath_icon" class="icon" src="' +
                bath_icon_src +
                '">' +
                (bathrooms !== null ? bathrooms : 0) +
                "</i></p>" +
                (vr === true
                  ? '<button id="btn_card_vr-' +
                    id +
                    '" name="' +
                    (card_number - 1) +
                    '"style="position: relative; left: 12vh; background-color: transparent; border: none;top: 1.5vh;"><img class="icon" src="' +
                    vr_icon_src +
                    '"/></button>'
                  : "") +
                "</div></div></a>";

              vr = false;

              document
                .getElementById("grid-container")
                .insertAdjacentHTML("beforeend", card__html);

              addVrClick(listing);
              addModalClick(listing);
            });

            if (newListings.length > 0) {
              offset += newListings.length;
              counter += newListings.length;
            }

            isLoadingProperties = false;

            return {
              tot: totalListings
            };
          })
          .catch(err => console.log(err));
      });
  };

  /**
   *
   * Initially load some items
   */
  loadProperties().then(resp => {
    document
      .getElementById("results")
      .insertAdjacentHTML(
        "afterbegin",
        "<b>" + resp.tot + "</b> results match your search"
      );

    if (typeof category !== "undefined")
      document.getElementsByName("actions-options")[0].value = category;
    else
      document.getElementsByName("actions-options")[0].value =
        "residential_sale";
    if (typeof subcategory !== "undefined")
      document.getElementsByName("category-options")[0].value = subcategory;
    else document.getElementsByName("category-options")[0].value = "455";
    if (typeof bedrooms !== "undefined")
      document.getElementsByName("bedrooms")[0].value = bedrooms;
    else document.getElementsByName("bedrooms")[0].value = "any";
    if (typeof bathrooms !== "undefined")
      document.getElementsByName("bathrooms")[0].value = bathrooms;
    else document.getElementsByName("bathrooms")[0].value = "any";
    if (typeof garage !== "undefined")
      document.getElementsByName("garage")[0].value = garage;
    else document.getElementsByName("garage")[0].value = "any";
    document.getElementById("min_land_size").value = min_land_size;
    document.getElementById("max_land_size").value = max_land_size;

    const sliderMin =
      typeof category !== "undefined"
        ? category === "residential_sale"
          ? 50000
          : 100
        : 100;
    const sliderMax =
      typeof category !== "undefined"
        ? category === "residential_sale"
          ? 50000000
          : 5000
        : 50000000;
    $("#slider-range").slider({
      range: true,
      min: sliderMin,
      max: sliderMax,
      values: [
        min_price > 0 ? min_price : sliderMin,
        max_price > 0 ? max_price : sliderMax
      ],
      slide: function(event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      }
    });
    $("#amount").val("$" + sliderMin + " - $" + sliderMax);
  });

  /**
   *
   * Whenever a new btn_card_vr is created, is required to relate this element to a new click to open the modal with the Virtual Tour
   */
  function addVrClick({
    id,
    address: { suburb_or_town },
    links,
    listing_category_id
  }) {
    setTimeout(() => {
      $("#btn_card_vr-" + id).click(function() {
        document.querySelector("body").style.overflow = "hidden";
        document.getElementById("modal").style.display = "block ";

        vr_number = this.name;

        if (vr_open === false) {
          listings[vr_number].links.forEach(function(item) {
            if (item.link_type === "virtual_tour") {
              if (
                item.link_url.startsWith(
                  "https://kindred-property-group.captur3d.io"
                )
              )
                iframe.src = item.link_url;
              document.querySelector('[id^="btn_vr"]').style.visibility =
                "hidden";
              document.querySelector('[id^="btn_return"]').style.visibility =
                "hidden";
              vr_open = true;
            }
          });
        }
      });
    }, 3000);
  }

  /**
   *
   * Whenever a new card is created, is required to relate this element to a new click to open the modal with the respective property selected
   */
  function addModalClick({
    id,
    address: { suburb_or_town },
    links,
    listing_category_id
  }) {
    $("#card-" + id).click(function() {
      document.querySelector("body").style.overflow = "hidden";
      document.getElementById("modal").style.display = "block ";

      card_name = this.id.split("-");
      card_id = card_name[1];
      card_number = this.name;

      if (id === card_id) {
        if (links.length > 0) {
          links.forEach(function(item) {
            let vr_link = item.link_url;
            if (
              item.link_type === "virtual_tour" &&
              vr_link.startsWith("https://kindred-property-group.captur3d.io")
            ) {
              if (vr_open === false)
                document.querySelector('[id^="btn_vr"]').style.visibility =
                  "visible";
            }
          });
        }

        let iframe = document.getElementById("iframe");
        if (vr_open === false) {
          iframe.src =
            "https://kindred.com.au/listings/" +
            listing_category_id +
            "-" +
            id +
            "-" +
            suburb_or_town.replace(" ", "-").toLowerCase() +
            "?hide_header=true";
        }
      }

      document
        .querySelector('[id^="btn_vr"]')
        .addEventListener("click", function() {
          if (vr_open === false) {
            listings[card_number].links.forEach(function(item) {
              if (item.link_type === "virtual_tour") {
                if (
                  item.link_url.startsWith(
                    "https://kindred-property-group.captur3d.io"
                  )
                )
                  iframe.src = item.link_url;
                document.querySelector('[id^="btn_vr"]').style.visibility =
                  "hidden";
                document.querySelector('[id^="btn_return"]').style.visibility =
                  "visible";
                vr_open = true;
              }
            });
          }
        });
    });

    document
      .querySelector('[id^="btn_return"]')
      .addEventListener("click", function() {
        if (vr_open === true) {
          iframe.src =
            "https://kindred.com.au/listings/" +
            listings[card_number].listing_category_id +
            "-" +
            listings[card_number].id +
            "-" +
            listings[card_number].address.suburb_or_town
              .replace(" ", "-")
              .toLowerCase() +
            "?hide_header=true";
          document.querySelector('[id^="btn_vr"]').style.visibility = "visible";
          document.querySelector('[id^="btn_return"]').style.visibility =
            "hidden";
          vr_open = false;
        }
      });
  }

  /**
   *
   * When the user clicks on <span> (x), close the modal
   */
  setTimeout(() => {
    document
      .getElementsByClassName("close")[0]
      .addEventListener("click", function() {
        document.querySelector("body").style.overflowY = "visible";
        document.getElementById("modal").style.display = "none";
        vr_open = false;
        document.querySelector('[id^="btn_vr"]').style.visibility = "hidden";
        document.querySelector('[id^="btn_return"]').style.visibility =
          "hidden";
        iframe.src = "";
      });
  }, 3000);

  /**
   *
   * When the user clicks anywhere outside of the modal, close it
   */
  setTimeout(() => {
    window.addEventListener("click", function(event) {
      if (event.target == modal) {
        document.querySelector("body").style.overflowY = "visible";
        document.getElementById("modal").style.display = "none";
        vr_open = false;
        document.querySelector('[id^="btn_vr"]').style.visibility = "hidden";
        document.querySelector('[id^="btn_return"]').style.visibility =
          "hidden";
        iframe.src = "";
      }
    });
  }, 3000);

  /**
   *
   * Open modal with more options in the filter
   */
  setTimeout(() => {
    document
      .querySelector('[id^="btn_filter"]')
      .addEventListener("click", function() {
        var content = document.querySelector('[id^="content"]');
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
  }, 3000);

  /**
   *
   * Open "Enquire Page" within modal
   */
  setTimeout(() => {
    document
      .querySelector('[id^="btn_enquire"]')
      .addEventListener("click", function() {
        document.querySelector("body").style.overflow = "hidden";
        document.getElementById("modal").style.display = "block ";
        let iframe = document.getElementById("iframe");
        iframe.src = "https://kindredkiosk.com.au/enquire/";
        document.querySelector('[id^="btn_vr"]').style.visibility = "hidden";
        document.querySelector('[id^="btn_return"]').style.visibility =
          "hidden";
      });
  }, 3000);

  /**
   *
   * Load data while scrolling
   */
  $(window).on("scroll", function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // when scroll to bottom of the page
      if (!isLoadingProperties && counter < totalListings) loadProperties();
    }
  });

  /**
   *
   * Update results
   */
  setTimeout(() => {
    document
      .querySelector('[id^="btn_update"]')
      .addEventListener("click", function() {
        category = document.getElementsByName("actions-options")[0];
        category =
          category.options[category.selectedIndex].value === "all"
            ? null
            : category.options[category.selectedIndex].value;
        subcategory = document.getElementsByName("category-options")[0];
        subcategory =
          subcategory.options[subcategory.selectedIndex].value === "all"
            ? null
            : subcategory.options[subcategory.selectedIndex].value;
        suburbs = document.getElementsByName("suburbs-options")[0];
        suburbs =
          suburbs.options[suburbs.selectedIndex].value === "all"
            ? null
            : suburbs.options[suburbs.selectedIndex].value;

        bedrooms = document.getElementsByName("bedrooms")[0];
        bedrooms =
          bedrooms.options[bedrooms.selectedIndex] &&
          bedrooms.options[bedrooms.selectedIndex].value != "any"
            ? bedrooms.options[bedrooms.selectedIndex].value
            : null;
        bathrooms = document.getElementsByName("bathrooms")[0];
        bathrooms =
          bathrooms.options[bathrooms.selectedIndex] &&
          bathrooms.options[bathrooms.selectedIndex].value != "any"
            ? bathrooms.options[bathrooms.selectedIndex].value
            : null;
        garage = document.getElementsByName("garage")[0];
        garage =
          garage.options[garage.selectedIndex] &&
          garage.options[garage.selectedIndex].value != "any"
            ? garage.options[garage.selectedIndex].value
            : null;
        min_land_size =
          document.getElementById("min_land_size").value > 0
            ? document.getElementById("min_land_size").value
            : null;
        max_land_size =
          document.getElementById("max_land_size").value > 0
            ? document.getElementById("max_land_size").value
            : null;

        var queryString =
          "?" +
          (category != null ? "category=" + category : "") +
          (subcategory != null ? "&subcategory=" + subcategory : "") +
          (suburbs != null ? "&suburbs=" + suburbs : "") +
          (bedrooms != null ? "&bedrooms=" + bedrooms : "") +
          (bathrooms != null ? "&bathrooms=" + bathrooms : "") +
          (garage != null ? "&garage=" + garage : "") +
          (min_land_size != null ? "&min_land_size=" + min_land_size : "") +
          (max_land_size != null ? "&max_land_size=" + max_land_size : "") +
          (min_price != null ? "&min_price=" + min_price : "") +
          (max_price != null ? "&max_price=" + max_price : "");

        window.location.href =
          "http://kindredkiosk.com.au/results/" + encodeURI(queryString);
        // window.location.href =
        //   "http://localhost/kindredkiosk/results" + encodeURI(queryString);
      });
  }, 3000);

  /**
   *
   * Get all the suburbs that have some property listed
   */
  setTimeout(() => {
    axios
      .post(
        "https://api.rexsoftware.com/v1/rex/PublishedListings::getUniqueListingSuburbs",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(function(res) {
        for (var i = 0; i < res.data.result.length; i++) {
          let suburb_option =
            "<option value='" +
            res.data.result[i].suburb_or_town.toLowerCase() +
            "'>" +
            res.data.result[i].suburb_or_town +
            "</option>";
          document
            .getElementsByName("suburbs-options")[0]
            .insertAdjacentHTML("beforeend", suburb_option);
        }
        return true;
      })
      .then(() => {
        if (suburbs)
          document.getElementsByName("suburbs-options")[0].value = decodeURI(
            suburbs
          );
      })
      .catch(err => console.log(err));
  }, 500);

  /**
   *
   * Getting URL params
   */
  function getAllUrlParams(url) {
    var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
    var obj = {};

    if (queryString) {
      queryString = queryString.split("#")[0];
      var arr = queryString.split("&");

      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split("=");
        var paramName = a[0];
        var paramValue = typeof a[1] === "undefined" ? true : a[1];

        paramName = paramName.toLowerCase();
        if (typeof paramValue === "string")
          paramValue = paramValue.toLowerCase();

        if (paramName.match(/\[(\d+)?\]$/)) {
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = [];

          if (paramName.match(/\[\d+\]$/)) {
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            obj[key].push(paramValue);
          }
        } else {
          if (!obj[paramName]) {
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            obj[paramName].push(paramValue);
          }
        }
      }
    }
    return obj;
  }
});
