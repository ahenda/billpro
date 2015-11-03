$(window).load(function () {
    $("#loading").fadeOut("slow");
});
function cssStyle() {
    if($('#container').hasClass('bblue'))
        $('#container').removeClass('bblue');
    if($('#container').hasClass('blightGrey'))
        $('#container').removeClass('blightGrey');
    if($('#container').hasClass('bblack'))
        $('#container').removeClass('bblack');
    if ($.cookie('the_style') == 'light') {
        $('link[href="'+site.base_url+'themes/'+site.settings.theme+'/assets/styles/blue.css"]').attr('disabled', 'disabled');
        $('link[href="assets/styles/blue.css"]').remove();
        $('<link>')
        .appendTo('head')
        .attr({type: 'text/css', rel: 'stylesheet'})
        .attr('href', site.base_url+'themes/'+site.settings.theme+'/assets/styles/light.css');
        $('#container').addClass('blightGrey');
    }
    else if ($.cookie('the_style') == 'blue') {
        $('link[href="'+site.base_url+'themes/'+site.settings.theme+'/assets/styles/light.css"]').attr('disabled', 'disabled');
        $('link[href="'+site.base_url+'themes/'+site.settings.theme+'/assets/styles/light.css"]').remove();
        $('<link>')
        .appendTo('head')
        .attr({type: 'text/css', rel: 'stylesheet'})
        .attr('href', ''+site.base_url+'themes/'+site.settings.theme+'/assets/styles/blue.css');
        $('#container').addClass('bblue');
    }
    else {
        $('link[href="'+site.base_url+'themes/'+site.settings.theme+'/assets/styles/light.css"]').attr('disabled', 'disabled');
        $('link[href="'+site.base_url+'themes/'+site.settings.theme+'/assets/styles/blue.css"]').attr('disabled', 'disabled');
        $('link[href="'+site.base_url+'themes/'+site.settings.theme+'/assets/styles/light.css"]').remove();
        $('link[href="'+site.base_url+'themes/'+site.settings.theme+'/assets/tyles/blue.css"]').remove();
        $('#container').addClass('bblack');
    }

    if($('#sidebar-left').hasClass('minified')) {
        //bootbox.alert('Unable to fix minified sidebar');
        //$.cookie('the_fixed', 'no');
        $('#content, #sidebar-left, #header').removeAttr("style");
        $('#fixedText').text('Fixed');
        $('#main-menu-act').addClass('full visible-md visible-lg').show();
        $('#fixed').removeClass('fixed');
    } else {
        if(site.settings.rtl == 1) {
            $.cookie('the_fixed', 'no');
        }
        if ($.cookie('the_fixed') == 'yes') {
            $('#content').css('margin-left', $('#sidebar-left').outerWidth(true)).css('margin-top', '40px');
            $('#sidebar-left').css('position', 'fixed').css('top', '40px').css('bottom', '40px').css('height', $(window).height()- 80).css('padding', '10px');
            $('#header').css('position', 'fixed').css('top', '0').css('width', '100%');
            $('#fixedText').text('Static');
            $('#main-menu-act').removeAttr("class").hide();
            $('#fixed').addClass('fixed');
            $("#sidebar-left").css("overflow","hidden");
            $('#sidebar-left').perfectScrollbar({suppressScrollX: true});
        } else {
            $('#content, #sidebar-left, #header').removeAttr("style");
            $('#fixedText').text('Fixed');
            $('#main-menu-act').addClass('full visible-md visible-lg').show();
            $('#fixed').removeClass('fixed');
            $('#sidebar-left').perfectScrollbar('destroy');
        }
    }
    widthFunctions();
}
$('#csv_file').change(function(e) {
    v = $(this).val();
    if (v != '') {
        var validExts = new Array(".csv");
        var fileExt = v;
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        if (validExts.indexOf(fileExt) < 0) {
            e.preventDefault();
            bootbox.alert("Invalid file selected. Only .csv file is allowed.");
            $(this).val(''); $(this).fileinput('clear');
            $('form[data-toggle="validator"]').bootstrapValidator('updateStatus', 'csv_file', 'NOT_VALIDATED');
            return false;
        }
        else
            return true;
    }
});

$(document).ready(function() {
    $('.top-menu-scroll').perfectScrollbar();
    $('#fixed').click(function(e) {
        e.preventDefault();
        if($('#sidebar-left').hasClass('minified')) {
            bootbox.alert('Unable to fix minified sidebar');
        } else {
            if($(this).hasClass('fixed')) {
                $.cookie('the_fixed', 'no');
            } else {
                $.cookie('the_fixed', 'yes');
            }
            cssStyle();
        }
    });
});

function widthFunctions(e) {
    var l = $("#sidebar-left").outerHeight(true),
    c = $("#content").height(),
    co = $("#content").outerHeight(),
    h = $("header").height(),
    f = $("footer").height(),
    wh = $(window).height(),
    ww = $(window).width();
    if (ww < 992) {
        $("#main-menu-act").removeClass("minified").addClass("full").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
        $("body").removeClass("sidebar-minified");
        $("#content").removeClass("sidebar-minified");
        $("#sidebar-left").removeClass("minified")
        if ($.cookie('the_fixed') == 'yes') {
            $.cookie('the_fixed', 'no');
            $('#content, #sidebar-left, #header').removeAttr("style");
            $("#sidebar-left").css("overflow-y","visible");
            $('#fixedText').text('Fixed');
            $('#main-menu-act').addClass('full visible-md visible-lg').show();
            $('#fixed').removeClass('fixed');
            $('#sidebar-left').perfectScrollbar('destroy');
        }
    }
    if (ww < 998 && ww > 750) {
        $('#main-menu-act').hide();
        $("body").addClass("sidebar-minified");
        $("#content").addClass("sidebar-minified");
        $("#sidebar-left").addClass("minified");
        $(".dropmenu > .chevron").removeClass("opened").addClass("closed");
        $(".dropmenu").parent().find("ul").hide();
        $("#sidebar-left > div > ul > li > a > .chevron").removeClass("closed").addClass("opened");
        $("#sidebar-left > div > ul > li > a").addClass("open");
        $('#fixed').hide();
    }
    if (ww > 1024 && $.cookie('the_sidebar') != 'minified') {
        $('#main-menu-act').removeClass("minified").addClass("full").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
        $("body").removeClass("sidebar-minified");
        $("#content").removeClass("sidebar-minified");
        $("#sidebar-left").removeClass("minified");
        $("#sidebar-left > div > ul > li > a > .chevron").removeClass("opened").addClass("closed");
        $("#sidebar-left > div > ul > li > a").removeClass("open");
        $('#fixed').show();
    }
    if ($.cookie('the_fixed') == 'yes') {
        $('#content').css('margin-left', $('#sidebar-left').outerWidth(true)).css('margin-top', '40px');
        $('#sidebar-left').css('position', 'fixed').css('top', '40px').css('bottom', '40px').css('height', $(window).height()- 80);
    }
    if (ww > 767) {
        wh - 80 > l && $("#sidebar-left").css("min-height", wh - h - f - 30);
        wh - 80 > c && $("#content").css("min-height", wh - h - f - 30);
    } else {
        $("#sidebar-left").css("min-height", "0px");
    }
    //$(window).scrollTop($(window).scrollTop() + 1);
}

jQuery(document).ready(function(e) {
    window.location.hash ? e('#myTab a[href="' + window.location.hash + '"]').tab('show') : e("#myTab a:first").tab("show");
    e("#myTab2 a:first, #dbTab a:first").tab("show");
    e("#myTab a, #myTab2 a, #dbTab a").click(function(t) {
        t.preventDefault();
        e(this).tab("show");
    });
    e('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();
    e("#toggle-fullscreen").button().click(function() {
        var t = e(this),
        n = document.documentElement;
        if (!t.hasClass("active")) {
            e("#thumbnails").addClass("modal-fullscreen");
            n.webkitRequestFullScreen ? n.webkitRequestFullScreen(window.Element.ALLOW_KEYBOARD_INPUT) : n.mozRequestFullScreen && n.mozRequestFullScreen()
        } else {
            e("#thumbnails").removeClass("modal-fullscreen");
            (document.webkitCancelFullScreen || document.mozCancelFullScreen || e.noop).apply(document)
        }
    });
    e(".btn-close").click(function(t) {
        t.preventDefault();
        e(this).parent().parent().parent().fadeOut()
    });
    e(".btn-minimize").click(function(t) {
        t.preventDefault();
        var n = e(this).parent().parent().next(".box-content");
        n.is(":visible") ? e("i", e(this)).removeClass("fa-chevron-up").addClass("fa-chevron-down") : e("i", e(this)).removeClass("fa-chevron-down").addClass("fa-chevron-up");
        n.slideToggle("slow", function() {
            widthFunctions();
        })
    });
});

jQuery(document).ready(function(e) {
    e("#main-menu-act").click(function() {
        if (e(this).hasClass("full")) {
            $.cookie('the_sidebar', 'minified');
            e(this).removeClass("full").addClass("minified").find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right");
            e("body").addClass("sidebar-minified");
            e("#content").addClass("sidebar-minified");
            e("#sidebar-left").addClass("minified");
            e(".dropmenu > .chevron").removeClass("opened").addClass("closed");
            e(".dropmenu").parent().find("ul").hide();
            e("#sidebar-left > div > ul > li > a > .chevron").removeClass("closed").addClass("opened");
            e("#sidebar-left > div > ul > li > a").addClass("open");
            $('#fixed').hide();
        } else {
            $.cookie('the_sidebar', 'full');
            e(this).removeClass("minified").addClass("full").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
            e("body").removeClass("sidebar-minified");
            e("#content").removeClass("sidebar-minified");
            e("#sidebar-left").removeClass("minified");
            e("#sidebar-left > div > ul > li > a > .chevron").removeClass("opened").addClass("closed");
            e("#sidebar-left > div > ul > li > a").removeClass("open");
            $('#fixed').show();
        }
        return false;
    });
e(".dropmenu").click(function(t) {
    t.preventDefault();
    if (e("#sidebar-left").hasClass("minified")) {
        if (!e(this).hasClass("open")) {
            e(this).parent().find("ul").first().slideToggle();
            e(this).find(".chevron").hasClass("closed") ? e(this).find(".chevron").removeClass("closed").addClass("opened") : e(this).find(".chevron").removeClass("opened").addClass("closed")
        }
    } else {
        e(this).parent().find("ul").first().slideToggle();
        e(this).find(".chevron").hasClass("closed") ? e(this).find(".chevron").removeClass("closed").addClass("opened") : e(this).find(".chevron").removeClass("opened").addClass("closed")
    }
});
if (e("#sidebar-left").hasClass("minified")) {
    e("#sidebar-left > div > ul > li > a > .chevron").removeClass("closed").addClass("opened");
    e("#sidebar-left > div > ul > li > a").addClass("open");
    e("body").addClass("sidebar-minified")
}
});

$(document).ready(function() {
    cssStyle();
    $('select, .select').select2({minimumResultsForSearch: 6});
    $('#customer, #rcustomer').select2({
       minimumInputLength: 1,
       ajax: {
        url: site.base_url+"customers/suggestions",
        dataType: 'json',
        quietMillis: 15,
        data: function (term, page) {
            return {
                term: term,
                limit: 10
            };
        },
        results: function (data, page) {
            if(data.results != null) {
                return { results: data.results };
            } else {
                return { results: [{id: '', text: 'No Match Found'}]};
            }
        }
    }
});
    $('#supplier, #rsupplier, .rsupplier').select2({
       minimumInputLength: 1,
       ajax: {
        url: site.base_url+"suppliers/suggestions",
        dataType: 'json',
        quietMillis: 15,
        data: function (term, page) {
            return {
                term: term,
                limit: 10
            };
        },
        results: function (data, page) {
            if(data.results != null) {
                return { results: data.results };
            } else {
                return { results: [{id: '', text: 'No Match Found'}]};
            }
        }
    }
});
    $('.input-tip').tooltip({placement: 'top', html: true, trigger: 'hover focus', container: 'body',
        title: function() {
            return $(this).attr('data-tip');
        }
    });
    $('.input-pop').popover({placement: 'top', html: true, trigger: 'hover', container: 'body',
        content: function() {
            return $(this).attr('data-tip');
        },
        title: function() {
            return '<b>' + $('label[for="' + $(this).attr('id') + '"]').text() + '</b>';
        }
    });
});

$(document).on('click', '*[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});
$(document).on('click', '*[data-toggle="popover"]', function(event) {
    event.preventDefault();
    $(this).popover();
});

$(document).ajaxStart(function(){
  $('#ajaxCall').show();
}).ajaxStop(function(){
  $('#ajaxCall').hide();
});

$(document).ready(function() {
    $('input[type="checkbox"],[type="radio"]').not('.skip').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
    $('textarea').not('.skip').redactor({
        buttons: ['formatting', '|', 'alignleft', 'aligncenter', 'alignright', 'justify', '|', 'bold', 'italic', 'underline', '|', 'unorderedlist', 'orderedlist', '|', /*'image', 'video',*/ 'link', '|', 'html'],
        formattingTags: ['p', 'pre', 'h3', 'h4'],
        minHeight: 100,
        changeCallback: function(e) {
            var editor = this.$editor.next('textarea');
            if($(editor).attr('required')){
                $('form[data-toggle="validator"]').bootstrapValidator('revalidateField', $(editor).attr('name'));
            }
        }
    });
    $(document).on('click', '.file-caption', function(){
        $(this).next('.input-group-btn').children('.btn-file').children('input.file').trigger('click');
    });
});

function suppliers(ele) {
    $(ele).select2({
       minimumInputLength: 1,
       ajax: {
        url: site.base_url+"suppliers/suggestions",
        dataType: 'json',
        quietMillis: 15,
        data: function (term, page) {
            return {
                term: term,
                limit: 10
            };
        },
        results: function (data, page) {
            if(data.results != null) {
                return { results: data.results };
            } else {
                return { results: [{id: '', text: 'No Match Found'}]};
            }
        }
    }
});
}

$(function() {
    $('.datetime').datetimepicker({format: site.dateFormats.js_ldate, fontAwesome: true, language: 'sma', weekStart: 1, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0});
    $('.date').datetimepicker({format: site.dateFormats.js_sdate, fontAwesome: true, language: 'sma', todayBtn: 1, autoclose: 1, minView: 2 });
    $(document).on('focus','.date', function(t) {
        $(this).datetimepicker({format: site.dateFormats.js_sdate, fontAwesome: true, todayBtn: 1, autoclose: 1, minView: 2 });
    });
    $(document).on('focus','.datetime', function() {
        $(this).datetimepicker({format: site.dateFormats.js_ldate, fontAwesome: true, weekStart: 1, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0});
    });
});

$(document).ready(function() {
    $('#dbTab a').on('shown.bs.tab', function(e) {
      var newt = $(e.target).attr('href');
      var oldt = $(e.relatedTarget).attr('href');
      $(oldt).hide();
      //$(newt).hide().fadeIn('slow');
      $(newt).hide().slideDown('slow');
  });
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
    });
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
    });
    $('.hideComment').click(function(){
        $.ajax({ url: site.base_url+'welcome/hideNotification/'+$(this).attr('id')});
    });
    $('.tip').tooltip();
    $('body').on('click', '#delete', function(e) {
        e.preventDefault();
        $('#form_action').val($(this).attr('data-action'));
        $('#action-form').submit();
    });
    $('body').on('click', '#sync_quantity', function(e) {
        e.preventDefault();
        $('#form_action').val($(this).attr('data-action'));
        $('#action-form-submit').trigger('click');
    });
    $('body').on('click', '#excel', function(e) {
        e.preventDefault();
        $('#form_action').val($(this).attr('data-action'));
        $('#action-form-submit').trigger('click');
    });
    $('body').on('click', '#pdf', function(e) {
        e.preventDefault();
        $('#form_action').val($(this).attr('data-action'));
        $('#action-form-submit').trigger('click');
    });
    $('body').on('click', '#labelProducts', function(e) {
        e.preventDefault();
        $('#form_action').val($(this).attr('data-action'));
        $('#action-form-submit').trigger('click');
    });
    $('body').on('click', '#barcodeProducts', function(e) {
        e.preventDefault();
        $('#form_action').val($(this).attr('data-action'));
        $('#action-form-submit').trigger('click');
    });
});

$(document).ready(function() {
    $('#product-search').click(function() {
        $('#product-search-form').submit();
    });
    //feedbackIcons:{valid: 'fa fa-check',invalid: 'fa fa-times',validating: 'fa fa-refresh'},
    $('form[data-toggle="validator"]').bootstrapValidator({ message: 'Please enter/select a value', submitButtons: 'input[type="submit"]' });
    fields = $('.form-control');
    $.each(fields, function() {
        var id = $(this).attr('id');
        var iname = $(this).attr('name');
        var iid = '#'+id;
        if (!!$(this).attr('data-bv-notempty') || !!$(this).attr('required')) {
            $("label[for='" + id + "']").append(' *');
            $(document).on('change', iid, function(){
                $('form[data-toggle="validator"]').bootstrapValidator('revalidateField', iname);
            });
        }
    });
    $('body').on('click', 'label', function (e) {
        var field_id = $(this).attr('for');
        if (field_id) {
            if($("#"+field_id).hasClass('select')) {
                $("#"+field_id).select2("open");
                return false;
            }
        }
    });
    $('body').on('focus', 'select', function (e) {
        var field_id = $(this).attr('id');
        if (field_id) {
            if($("#"+field_id).hasClass('select')) {
                $("#"+field_id).select2("open");
                return false;
            }
        }
    });
    $('#myModal').on('hidden.bs.modal', function() {
        $(this).find('.modal-dialog').empty();
        //$(this).find('#myModalLabel').empty().html('&nbsp;');
        //$(this).find('.modal-body').empty().text('Loading...');
        //$(this).find('.modal-footer').empty().html('&nbsp;');
        $(this).removeData('bs.modal');
    });
    $('#myModal2').on('hidden.bs.modal', function () {
        $(this).find('.modal-dialog').empty();
        //$(this).find('#myModalLabel').empty().html('&nbsp;');
        //$(this).find('.modal-body').empty().text('Loading...');
        //$(this).find('.modal-footer').empty().html('&nbsp;');
        $(this).removeData('bs.modal');
        $('#myModal').css('zIndex', '1050');
        $('#myModal').css('overflow-y', 'scroll');
    });
    $('#myModal2').on('show.bs.modal', function () {
        $('#myModal').css('zIndex', '1040');
    });
    $('.modal').on('show.bs.modal', function () {
        $('#modal-loading').show();
        $('.blackbg').css('zIndex', '1041');
        $('.loader').css('zIndex', '1042');
    }).on('hide.bs.modal', function () {
        $('#modal-loading').hide();
        $('.blackbg').css('zIndex', '3');
        $('.loader').css('zIndex', '4');
    });
    $(document).on('click', '.po', function(e) {
        e.preventDefault();
        $('.po').popover({html: true, placement: 'left', trigger: 'manual'}).popover('show').not(this).popover('hide');
        return false;
    });
    $(document).on('click', '.po-close', function() {
        $('.po').popover('hide');
        return false;
    });
    $(document).on('click', '.po-delete', function(e) {
        var row = $(this).closest('tr');
        e.preventDefault();
        $('.po').popover('hide');
        var link = $(this).attr('href');
        $.ajax({type: "get", url: link,
            success: function(data) { row.remove(); addAlert(data, 'success'); },
            error: function(data) { addAlert('Failed', 'danger'); }
        });
        return false;
    });
    $(document).on('click', '.po-delete1', function(e) {
        e.preventDefault();
        $('.po').popover('hide');
        var link = $(this).attr('href');
        var s = $(this).attr('id'); var sp = s.split('__')
        $.ajax({type: "get", url: link,
            success: function(data) { addAlert(data, 'success'); $('#'+sp[1]).remove(); },
            error: function(data) { addAlert('Failed', 'danger'); }
        });
        return false;
    });
    $('body').on('click', '.bpo', function(e) {
        e.preventDefault();
        $(this).popover({html: true, trigger: 'manual'}).popover('toggle');
        return false;
    });
    $('body').on('click', '.bpo-close', function(e) {
        $('.bpo').popover('hide');
        return false;
    });
    $('#genNo').click(function(){
        var no = generateCardNo();
        $(this).parent().parent('.input-group').children('input').val(no);
        return false;
    });
    $('#inlineCalc').calculator({layout: ['_%+-CABS','_7_8_9_/','_4_5_6_*','_1_2_3_-','_0_._=_+'], showFormula:true});
    $('.calc').click(function(e) { e.stopPropagation();});
});

function addAlert(message, type) {
    $('#alerts').empty().append(
        '<div class="alert alert-' + type + '">' +
        '<button type="button" class="close" data-dismiss="alert">' +
        '&times;</button>' + message + '</div>');
}

$(document).ready(function() {
    if ($.cookie('the_sidebar') == 'minified') {
        $('#main-menu-act').removeClass("full").addClass("minified").find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right");
        $("body").addClass("sidebar-minified");
        $("#content").addClass("sidebar-minified");
        $("#sidebar-left").addClass("minified");
        $(".dropmenu > .chevron").removeClass("opened").addClass("closed");
        $(".dropmenu").parent().find("ul").hide();
        $("#sidebar-left > div > ul > li > a > .chevron").removeClass("closed").addClass("opened");
        $("#sidebar-left > div > ul > li > a").addClass("open");
        $('#fixed').hide();
    } else {

        $('#main-menu-act').removeClass("minified").addClass("full").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
        $("body").removeClass("sidebar-minified");
        $("#content").removeClass("sidebar-minified");
        $("#sidebar-left").removeClass("minified");
        $("#sidebar-left > div > ul > li > a > .chevron").removeClass("opened").addClass("closed");
        $("#sidebar-left > div > ul > li > a").removeClass("open");
        $('#fixed').show();
    }
});

$(document).ready(function() {
    $('#daterange').daterangepicker({
        timePicker: true,
        format: (site.dateFormats.js_sdate).toUpperCase()+' HH:mm',
        ranges: {
         'Today': [moment().hours(0).minutes(0).seconds(0), moment()],
         'Yesterday': [moment().subtract('days', 1).hours(0).minutes(0).seconds(0), moment().subtract('days', 1).hours(23).minutes(59).seconds(59)],
         'Last 7 Days': [moment().subtract('days', 6).hours(0).minutes(0).seconds(0), moment().hours(23).minutes(59).seconds(59)],
         'Last 30 Days': [moment().subtract('days', 29).hours(0).minutes(0).seconds(0), moment().hours(23).minutes(59).seconds(59)],
         'This Month': [moment().startOf('month').hours(0).minutes(0).seconds(0), moment().endOf('month').hours(23).minutes(59).seconds(59)],
         'Last Month': [moment().subtract('month', 1).startOf('month').hours(0).minutes(0).seconds(0), moment().subtract('month', 1).endOf('month').hours(23).minutes(59).seconds(59)]
     }
 },
 function(start, end) {
    refreshPage(start.format('YYYY-MM-DD HH:mm'), end.format('YYYY-MM-DD HH:mm'));
});
});

function refreshPage(start, end) {
    window.location.replace(CURI + '/' + encodeURIComponent(start) + '/' + encodeURIComponent(end));
}

function retina() {
    retinaMode = window.devicePixelRatio > 1;
    return retinaMode
}

$(document).ready(function() {
    $('#cssLight').click(function(e) {
        e.preventDefault();
        $.cookie('the_style', 'light');
        cssStyle();
        return true;
    });
    $('#cssBlue').click(function(e) {
        e.preventDefault();
        $.cookie('the_style', 'blue');
        cssStyle();
        return true;
    });
    $('#cssBlack').click(function(e) {
        e.preventDefault();
        $.cookie('the_style', 'black');
        cssStyle();
        return true;
    });
    $("#toTop").click(function(e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: 0}, 100);
    });
});
/*
 $(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
 });
*/
$(document).on('ifChecked', '.checkth, .checkft', function(event) {
    $('.checkth, .checkft').iCheck('check');
    $('.multi-select').each(function() {
        $(this).iCheck('check');
    });
});
$(document).on('ifUnchecked', '.checkth, .checkft', function(event) {
    $('.checkth, .checkft').iCheck('uncheck');
    $('.multi-select').each(function() {
        $(this).iCheck('uncheck');
    });
});
$(document).on('ifUnchecked', '.multi-select', function(event) {
    $('.checkth, .checkft').attr('checked', false);
    $('.checkth, .checkft').iCheck('update');
});

function fld(oObj) {
    if (oObj != null) {
        var aDate = oObj.split('-');
        var bDate = aDate[2].split(' ');
        year = aDate[0], month = aDate[1], day = bDate[0], time = bDate[1];
        if (site.dateFormats.js_sdate == 'dd-mm-yyyy')
            return day + "-" + month + "-" + year + " " + time;
        else if (site.dateFormats.js_sdate === 'dd/mm/yyyy')
            return day + "/" + month + "/" + year + " " + time;
        else if (site.dateFormats.js_sdate == 'dd.mm.yyyy')
            return day + "." + month + "." + year + " " + time;
        else if (site.dateFormats.js_sdate == 'mm/dd/yyyy')
            return month + "/" + day + "/" + year + " " + time;
        else if (site.dateFormats.js_sdate == 'mm-dd-yyyy')
            return month + "-" + day + "-" + year + " " + time;
        else if (site.dateFormats.js_sdate == 'mm.dd.yyyy')
            return month + "." + day + "." + year + " " + time;
        else
            return oObj;
    } else {
        return '';
    }
}

function fsd(oObj) {
    if (oObj != null) {
        var aDate = oObj.split('-');
        if (site.dateFormats.js_sdate == 'dd-mm-yyyy')
            return aDate[2] + "-" + aDate[1] + "-" + aDate[0];
        else if (site.dateFormats.js_sdate === 'dd/mm/yyyy')
            return aDate[2] + "/" + aDate[1] + "/" + aDate[0];
        else if (site.dateFormats.js_sdate == 'dd.mm.yyyy')
            return aDate[2] + "." + aDate[1] + "." + aDate[0];
        else if (site.dateFormats.js_sdate == 'mm/dd/yyyy')
            return aDate[1] + "/" + aDate[2] + "/" + aDate[0];
        else if (site.dateFormats.js_sdate == 'mm-dd-yyyy')
            return aDate[1] + "-" + aDate[2] + "-" + aDate[0];
        else if (site.dateFormats.js_sdate == 'mm.dd.yyyy')
            return aDate[1] + "." + aDate[2] + "." + aDate[0];
        else
            return oObj;
    } else {
        return '';
    }
}
function generateCardNo(x) {
    if(!x) { x = 16; }
    chars = "1234567890";
    no = "";
    for (var i=0; i<x; i++) {
       var rnum = Math.floor(Math.random() * chars.length);
       no += chars.substring(rnum,rnum+1);
   }
   return no;
}
function roundNumber(num, nearest) {
    if(!nearest) { nearest = 0.05; }
    return Math.round((num / nearest) * nearest);
}
function getNumber(x) {
    return accounting.unformat(x);
}
function formatQuantity(x) {
    return (x != null) ? '<div class="text-center">'+formatNumber(x, site.settings.qty_decimals)+'</div>' : '';
}
function formatQuantity2(x) {
    return (x != null) ? formatNumber(x, site.settings.qty_decimals) : '';
}
function formatNumber(x, d) {
    if(!d && d != 0) { d = site.settings.decimals; }
    if(site.settings.sac == 1) {
        return formatSA(parseFloat(x).toFixed(d));
    }
    return accounting.formatNumber(x, d, site.settings.thousands_sep == 0 ? ' ' : site.settings.thousands_sep, site.settings.decimals_sep);
}
function formatMoney(x, symbol) {
    if(!symbol) { symbol = ""; }
    if(site.settings.sac == 1) {
        return symbol+''+formatSA(parseFloat(x).toFixed(site.settings.decimals));
    }
    return accounting.formatMoney(x, symbol, site.settings.decimals, site.settings.thousands_sep == 0 ? ' ' : site.settings.thousands_sep, site.settings.decimals_sep, "%s%v");
}
function is_valid_discount(mixed_var) {
    return (is_numeric(mixed_var) || (/([0-9]%)/i.test(mixed_var))) ? true : false;
}
function is_numeric(mixed_var) {
    var whitespace =
    " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
    return (typeof mixed_var === 'number' || (typeof mixed_var === 'string' && whitespace.indexOf(mixed_var.slice(-1)) === -
        1)) && mixed_var !== '' && !isNaN(mixed_var);
}
function is_float(mixed_var) {
  return +mixed_var === mixed_var && (!isFinite(mixed_var) || !! (mixed_var % 1));
}
function decimalFormat(x) {
    if (x != null) {
        return '<div class="text-center">'+formatNumber(x)+'</div>';
    } else {
        return '<div class="text-center">0</div>';
    }
}
function currencyFormat(x) {
    if (x != null) {
        return '<div class="text-right">'+formatMoney(x)+'</div>';
    } else {
        return '<div class="text-right">0</div>';
    }
}
function formatDecimal(x) {
    return parseFloat(parseFloat(x).toFixed(site.settings.decimals));
}
function pqFormat(x) {
    if (x != null) {
        var d = '', pqc = x.split("___");
        for (index = 0; index < pqc.length; ++index) {
            var pq = pqc[index];
            var v = pq.split("__");
            d += v[0]+' ('+formatQuantity2(v[1])+')<br>';
        }
        return d;
    } else {
        return '';
    }
}
function checkbox(x) {
    return '<center><input class="checkbox multi-select" type="checkbox" name="val[]" value="' + x + '" /></center>';
}
function img_hl(x) {
    return x == null ? '' : '<center><ul class="enlarge"><li><img src="'+site.base_url+'assets/uploads/thumbs/' + x + '" alt="' + x + '" style="width:30px; height:30px;" class="img-circle" /><span><a href="'+site.base_url+'assets/uploads/' + x + '" data-toggle="lightbox"><img src="'+site.base_url+'assets/uploads/' + x + '" alt="' + x + '" style="width:200px;" class="img-thumbnail" /></a></span></li></ul></center>';
    //return x == null ? '' : '<center><a href="'+site.base_url+'assets/uploads/' + x + '" data-toggle="lightbox"><img src="'+site.base_url+'assets/uploads/thumbs/' + x + '" alt="" style="width:30px; height:30px;" /></a></center>';
}
function user_status(x) {
    var y = x.split("__");
    return y[0] == 1 ?
    '<a href="'+site.base_url+'auth/deactivate/'+ y[1] +'" data-toggle="modal" data-target="#myModal"><span class="label label-success"><i class="fa fa-check"></i> '+lang['active']+'</span></a>' :
    '<a href="'+site.base_url+'auth/activate/'+ y[1] +'"><span class="label label-danger"><i class="fa fa-times"></i> '+lang['inactive']+'</span><a/>';
}
function row_status(x) {
    if(x == null) {
        return '';
    } else if(x == 'pending') {
        return '<div class="text-center"><span class="label label-warning">'+lang[x]+'</span></div>';
    } else if(x == 'completed' || x == 'paid' || x == 'sent' || x == 'received') {
        return '<div class="text-center"><span class="label label-success">'+lang[x]+'</span></div>';
    } else if(x == 'partial' || x == 'transferring' || x == 'ordered') {
        return '<div class="text-center"><span class="label label-info">'+lang[x]+'</span></div>';
    } else if(x == 'due' || x == 'returned') {
        return '<div class="text-center"><span class="label label-danger">'+lang[x]+'</span></div>';
    } else {
        return '<div class="text-center"><span class="label label-default">'+lang[x]+'</span></div>';
    }
}
function formatSA (x) {
    x=x.toString();
    var afterPoint = '';
    if(x.indexOf('.') > 0)
       afterPoint = x.substring(x.indexOf('.'),x.length);
    x = Math.floor(x);
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;

    return res;
}

$(document).ready(function() {
    $('body').on('click', '.product_link td:not(:first-child, :nth-child(2), :last-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'products/modal_view/' + $(this).parent('.product_link').attr('id')});
        $('#myModal').modal('show');
        //window.location.href = site.base_url + 'products/view/' + $(this).parent('.product_link').attr('id');
    });
    $('body').on('click', '.purchase_link td:not(:first-child :last-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'purchases/modal_view/' + $(this).parent('.purchase_link').attr('id')});
        $('#myModal').modal('show');
        //window.location.href = site.base_url + 'purchases/view/' + $(this).parent('.purchase_link').attr('id');
    });
    $('body').on('click', '.transfer_link td:not(:first-child, :last-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'transfers/view/' + $(this).parent('.transfer_link').attr('id')});
        $('#myModal').modal('show');
    });
    $('body').on('click', '.invoice_link td:not(:first-child :last-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'sales/modal_view/' + $(this).parent('.invoice_link').attr('id')});
        $('#myModal').modal('show');
        //window.location.href = site.base_url + 'sales/view/' + $(this).parent('.invoice_link').attr('id');
    });
    $('body').on('click', '.receipt_link td:not(:first-child :last-child)', function() {
        $('#myModal').modal({ remote: site.base_url + 'pos/view/' + $(this).parent('.receipt_link').attr('id') + '/1' });
    });
    $('body').on('click', '.return_link td', function() {
        window.location.href = site.base_url + 'sales/view_return/' + $(this).parent('.return_link').attr('id');
    });
    $('body').on('click', '.quote_link td:not(:first-child :last-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'quotes/modal_view/' + $(this).parent('.quote_link').attr('id')});
        $('#myModal').modal('show');
        //window.location.href = site.base_url + 'quotes/view/' + $(this).parent('.quote_link').attr('id');
    });
    $('body').on('click', '.delivery_link td:not(:first-child, :last-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'sales/view_delivery/' + $(this).parent('.delivery_link').attr('id')});
        $('#myModal').modal('show');
    });
    $('body').on('click', '.customer_link td:not(:first-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'customers/edit/' + $(this).parent('.customer_link').attr('id')});
        $('#myModal').modal('show');
    });
    $('body').on('click', '.supplier_link td:not(:first-child)', function() {
        $('#myModal').modal({remote: site.base_url + 'suppliers/edit/' + $(this).parent('.supplier_link').attr('id')});
        $('#myModal').modal('show');
    });
    $('#clearLS').click(function(event) {
        bootbox.confirm(lang.r_u_sure, function(result) {
        if(result == true) {
            localStorage.clear();
            location.reload();
        }
        });
        return false;
    });
    $(document).on('click', '[data-toggle="ajax"]', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function( data ) {
            $("#myModal").html(data).modal();
        });
    });
});

function fixAddItemnTotals() {
    var ai = $("#sticker");
    var aiTop = (ai.position().top)+250;
    var bt = $("#bottom-total");
    $(window).scroll(function() {
        var windowpos = $(window).scrollTop();
        if (windowpos >= aiTop) {
            ai.addClass("stick").css('width', ai.parent('form').width()).css('zIndex', 50001);
            if ($.cookie('the_fixed') == 'yes') { ai.css('top', '40px'); } else { ai.css('top', 0); }
            $('#add_item').removeClass('input-lg');
            $('.addIcon').removeClass('fa-2x');
        } else {
            ai.removeClass("stick").css('width', bt.parent('form').width()).css('zIndex', 50001);
            if ($.cookie('the_fixed') == 'yes') { ai.css('top', 0); }
            $('#add_item').addClass('input-lg');
            $('.addIcon').addClass('fa-2x');
        }
        if (windowpos <= ($(document).height() - $(window).height() - 120)) {
            bt.css('position', 'fixed').css('bottom', 0).css('width', bt.parent('form').width()).css('zIndex', 50000);
        } else {
            bt.css('position', 'static').css('width', ai.parent('form').width()).css('zIndex', 50000);
        }
    });
}
function ItemnTotals() {
    fixAddItemnTotals();
    $(window).bind("resize", fixAddItemnTotals);
}

if(site.settings.auto_detect_barcode == 1) {
    $(document).ready(function() {
        var pressed = false;
        var chars = [];
        $(window).keypress(function(e) {
            chars.push(String.fromCharCode(e.which));
            if (pressed == false) {
                setTimeout(function(){
                    if (chars.length >= 8) {
                        var barcode = chars.join("");
                        $( "#add_item" ).focus().autocomplete( "search", barcode );
                    }
                    chars = [];
                    pressed = false;
                },200);
            }
            pressed = true;
        });
    });
}

$(window).bind("resize", widthFunctions);
$(window).load(widthFunctions);
