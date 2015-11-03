<style>
    .table th {
        text-align: center;
    }

    .table td {
        text-align: center;
    }

    .table a:hover {
        text-decoration: none;
    }

    .cl_wday {
        text-align: center;
        font-weight: bold;
    }

    .cl_equal {
        width: 14%;
    }

    td.day {
        width: 14%;
        padding: 0 !important;
        vertical-align: top !important;
    }

    .day_num {
        width: 100%;
        text-align: left;
        cursor: pointer;
        margin: 0;
        padding: 8px;
    }

    .day_num:hover {
        background: #F5F5F5;
    }

    .content {
        width: 100%;
        text-align: left;
        color: #428bca;
        padding: 8px;
    }

    .highlight {
        color: #0088CC;
        font-weight: bold;
    }

    .day .content ol, .day .content ul {
        padding-left: 15px;
    }

    .day .content ol li, .day .content ul li {
        border-bottom: 1px dotted #DDD;
    }
</style>
<div class="box">
    <div class="box-header">
        <h2 class="blue"><i class="fa-fw fa fa-calendar"></i><?= lang('calendar'); ?></h2>
    </div>
    <div class="box-content">
        <div class="row">
            <div class="col-lg-12">

                <p class="introtext"><?= lang("calendar_line") ?></p>

                <div>
                    <?php echo $calendar; ?>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="modal fade" id="calModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i
                        class="fa fa-2x">&times;</i></button>
                <h4 class="modal-title" id="myModalLabel"><?php echo lang('add_event'); ?></h4>
            </div>
            <div class="modal-body">
                <p><?= lang('add_modify_event'); ?></p>

                <p><?php echo form_textarea('event', '', 'class="input-block-level" style="height:100px;" id="event_text"'); ?>
                    <input type="hidden" name="dayNum" id="dayNum" value=""/></p>
            </div>
            <div class="modal-footer">
                <span id="delb" class="pull-left"
                      style="min-width:70px; max-width:150px; text-align:left; display:none;"><button
                        class="btn btn-danger" id="del"><?php echo $this->lang->line("delete"); ?></button></span>

                <button type="submit" class="btn btn-primary" id="ok"
                        data-loading-text=""><?php echo $this->lang->line("add_event"); ?></button>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    $('document').ready(function () {
        $('.table .day_num').click(function () {
            day_num = $(this).html();
            month_year = $('#month_year').text();
            $('#selected_date').text(day_num + ' ' + month_year);
            if ($(this).next().length) {
                var v = $(this).next().html();
                var v = v.replace(/<br>/g, "|");
                $('#delb').show();
            } else {
                var v = "";
                $('#delb').hide();
            }

            $('#event_text').redactor('set', v);
            $('#dayNum').val(day_num);
            $('#calModal').appendTo("body").modal('show');

        });
        $('#calModal').on('shown.bs.modal', function () {
            $('#event_text').focus();
            $initialVal = $('#event_text').val();
            $('#event_text').val('');
            $('#event_text').val($initialVal);

        });

        $('#ok').click(function () {
            $(this).text('<?php echo $this->lang->line("adding"); ?>');
            day_data = $('#event_text').val();
            day = $('#dayNum').val();

            if (day_data != null) {

                $.ajax({
                    url: window.location,
                    type: 'POST',
                    data: {
                <?php echo $this->security->get_csrf_token_name(); ?>:
                '<?php echo $this->security->get_csrf_hash() ?>',
                    day
            :
                day,
                    data
            :
                day_data
            }
            ,
            success: function (msg) {
                location.reload();
            }
        });

    }
    })
    ;

    $('#del').click(function () {
            $(this).text('<?php echo $this->lang->line("deleting"); ?>');
            day = $('#dayNum').val();
            $.ajax({
                url: window.location,
                type: 'POST',
                data: {
            <?php echo $this->security->get_csrf_token_name(); ?>:
            '<?php echo $this->security->get_csrf_hash() ?>',
                day
            :
            day,
                data
            :
            ''
        },
        success
    :
    function (msg) {
        location.reload();
    }
    })
    ;
    })
    ;

    })
    ;

</script>