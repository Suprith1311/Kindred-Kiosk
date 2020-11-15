<?php get_header(); ?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/resources/demos/style.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

<script type="text/javascript">
    (function() {
        setTimeout(function() {
            window.location = "http://kindredkiosk.com.au";
        }, 200000);
    })();
</script>

<div class="buttons">
    <div class="enquire"><a id="btn_enquire"><img src="<?php echo IMAGES_URI . '/enquire_icon.png'?>" />let's chat</a></div>
    <div class="reset"><i class="fa fa-undo"></i><a href="http://kindredkiosk.com.au/filter">restart</a></div>
</div>
<section class="results">

    <div class="results__title">
        <p id="results"></p>
        <div class="line"></div>
    </div>
    <div class="results__listings">
        <div class="listings__grid-container" id="grid-container">
        </div>
        <div class="results__filter">
            <div class="part-1">
                <form>
                    <select name="actions-options" class="filter__options">
                        <option value="all" selected>
                            <p> all </p>
                        </option>
                        <option value="residential_sale" class="options" selected>buy</option>
                        <option value="residential_rental" class="options">rent</option>
                    </select>
                </form>
                <form>
                    <select name="category-options" class="filter__options">
                        <option value="all" selected>
                            <p> all </p>
                        </option>
                        <option value="455" selected>
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
                </form>

                <script type="text/javascript">
                    $(document).ready(function() {
                        $(".filter__options").select2();
                    });
                </script>

                <form>
                    <select name="suburbs-options" class="filter__options multiple" multiple="multiple">
                        <option value="all" selected>all suburbs</option>
                    </select>
                </form>
                <div class="dropup">
                    <button id="btn_filter" class="dropbtn filter__btn-options">
                        filter<i class="button__icon fa fa-angle-up fa-lg"></i>
                    </button>
                    <div class="dropup-content">
                        <div class="grid_filter">
                            <div class="bedrooms">
                                <label>bedrooms</label>
                                <select name="bedrooms">
                                    <option value="any">any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="bathrooms">
                                <label>bathrooms</label>
                                <select name="bathrooms">
                                    <option value="any">any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="garage">
                                <label>garage</label>
                                <form>
                                    <select name="garage">
                                        <option value="any">any</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select></form>
                            </div>
                            <div class="landsize">
                                <label>land size</label>
                                <form>
                                    <form>
                                        <input id="min_land_size" type="number" placeholder="m2" />
                                        <input id="max_land_size" type="number" placeholder="m2" />
                                    </form>
                                </form>
                            </div>
                            <div class="price">
                                <label>price</label>
                                <form>
                                    <script>
                                        $(function() {
                                            $("#slider-range").slider({
                                                range: true,
                                                slide: function(event, ui) {
                                                    $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                                                }
                                            });
                                            $("#amount").val(
                                                "$" +
                                                $("#slider-range").slider("values", 0) +
                                                " - $" +
                                                $("#slider-range").slider("values", 1)
                                            );                                            
                                        });
                                    </script>

                                    <div id="slider-range" class="slider"></div>
                                </form>
                            </div>
                            <div class="slider-input">
                                <input type="text" id="amount" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="part-2">
                <button id="btn_update" class="filter__btn-update">
                    update<i class="button__icon fa fa-arrow-right"></i>
                </button>
            </div>
        </div>

        <div id="modal" class="listings__modal">
            <div class="modal__content">
                <button class="close"><i class="fa fa-times"></i></button>
                <button id="btn_return" class="return-button"><i class="vr-icon fa fa-undo"></i></button>
                <button id="btn_vr" class="vr-button"><img id="vr_icon" src="<?php echo IMAGES_URI . '/vr-512.png' ?>" class="vr-icon" /></button>
                <div class="holds-the-iframe">
                    <iframe class="content__iframe" id="iframe" src="" target="_parent">
                </div>
            </div>
        </div>
    </div>

</section>

<?php get_footer(); ?>