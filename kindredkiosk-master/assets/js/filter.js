import "../sass/styles.scss";

import axios from "axios";

let action, category, suburbs;
let token = null;

/**
 * Mark
 * receives multiple select box
 * @param {dom element} select
 * @return [string]
 */
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.text);
    }
  }
  return result;
}

// get all the suburbs that have some property listed
axios
  .post("https://api.rexsoftware.com/v1/rex/authentication::login", {
    email: "itsupport@kindred.com.au",
    password: "LBzVkajepE8q"
  })
  .then(function(res) {
    token = res.data.result;
  })
  .catch(function(err) {
    console.log(err);
  });
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
      console.log(res);
      for (var i = 0; i < res.data.result.length; i++) {
        let suburb_option =
          "<option value='" +
          res.data.result[i].suburb_or_town +
          "'>" +
          res.data.result[i].suburb_or_town +
          "</option>";
        document
          .getElementsByName("suburbs-options")[0]
          .insertAdjacentHTML("beforeend", suburb_option);
      }
    })
    .catch(err => console.log(err));
}, 500);

setTimeout(() => {
  document.getElementById("button_results").addEventListener(
    "click",
    function() {
      action = document.getElementsByName("actions-options")[0];
      action = action.options[action.selectedIndex].value;
      // category = document.getElementsByName("category-options")[0];
      // category = category.options[category.selectedIndex].value;
      // suburbs = document.getElementsByName("suburbs-options")[0];

      // get all selected text nodes in array
      // const multipleSuburbs = getSelectValues(suburbs);
      // join into comma-delimited string
      // const multipeSuburbsToString = multipleSuburbs.join(",");
      // build query string
      const queryString = "?category=" + action;
      // + "&subcategory=" + category + "&suburbs=" + multipeSuburbsToString;

      // encode uri string
      window.location.href =
        "http://kindredkiosk.com.au/results" + encodeURI(queryString);
    //   window.location.href = "http://localhost/kindredkiosk/results" + encodeURI(queryString);
    },
    false
  );
}, 3000);
