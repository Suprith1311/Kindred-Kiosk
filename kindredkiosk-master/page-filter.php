<?php get_header(); ?>

<script type="text/javascript">
  (function() {
    setTimeout(function() {
      window.location = "http://kindredkiosk.com.au";
    }, 300000);
  })();
</script>

<script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=5df85e388f0a7e001381ca80&product=inline-share-buttons&cms=website' async='async'></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"> </script> -->

<section class="filter">
  <img src="<?php echo IMAGES_URI . '/white_logo.png' ?>" class="logo">

  <div class="filter__body">

    <img class="image" src="<?php echo IMAGES_URI . '/filter-page.jpeg' ?>" />

    <div class="body__background"></div>
    <div class="body__content">
      <div class="body__buttons">
        <div class="enquire"><a href="http://kindredkiosk.com.au/enquire/"><img src="<?php echo IMAGES_URI . '/enquire_icon.png' ?>" />let's chat</a></div>
        <div class="reset"><i class="fa fa-undo"></i><a href="http://kindredkiosk.com.au">restart</a></div>
      </div>

      <div>
        <div class="content__filter">
          <p>I'm looking to
            <form>
              <select name="actions-options" class="filter__options">
                <option value="residential_sale" class="options">buy</option>
                <option value="residential_rental" class="options">rent</option>
                <i class="fa fa-angle-up fa-lg"></i>
              </select>
            </form>
            <br>
            <!-- <p> a </p>
            <form>
              <select name="category-options" class="filter__options">
                <option value="455">
                  <p> house </p>
                </option>
                <option value="459">
                  <p> apartment </p>
                </option>
                <option value="456">
                  <p> unit </p>
                </option>
                <option value="460">
                  <p> flat </p>
                </option>
                <option value="458">
                  <p> villa </p>
                </option>
                <option value="461">
                  <p> studio </p>
                </option>
                <option value="457">
                  <p> townhouse </p>
                </option>
                <option value="467">
                  <p> terrace </p>
                </option>
                <option value="470">
                  <p> other </p>
                </option>
              </select>
            </form> -->

            <!-- <script type="text/javascript">
              $(document).ready(function() {
                $(".filter__options").select2();
              });
            </script> -->

            <!-- <p> located in </p>
            <form>
              <select name="suburbs-options" class="filter__options multiple" multiple="multiple">
                <option value="all">all suburbs</option>
              </select>
            </form> -->
          </p>
        </div>
        <div>
          <button id="button_results">show me results<i class="button__icon fa fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>