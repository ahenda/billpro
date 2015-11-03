<style type="text/css">
    .dfTable th, .dfTable td {
        text-align: center;
        vertical-align: middle;
    }

    .dfTable td {
        padding: 2px;
    }

    .data tr:nth-child(odd) td {
        color: #2FA4E7;
    }

    .data tr:nth-child(even) td {
        text-align: right;
    }
</style>
<div class="box">
    <div class="box-header">
        <h2 class="blue"><i class="fa-fw fa fa-calendar"></i><?= lang('monthly_sales'); ?></h2>

        <div class="box-icon">
            <ul class="btn-tasks">
                <li class="dropdown"><a href="#" id="pdf" class="tip" title="<?= lang('download_pdf') ?>"><i
                            class="icon fa fa-file-pdf-o"></i></a></li>
                <li class="dropdown"><a href="#" id="image" class="tip" title="<?= lang('save_image') ?>"><i
                            class="icon fa fa-file-picture-o"></i></a></li>
            </ul>
        </div>
    </div>
    <div class="box-content">
        <div class="row">
            <div class="col-lg-12">
                <p class="introtext"><?= lang("reports_calendar_text") ?></p>

                <div class="table-responsive">
                    <table class="table table-bordered table-striped dfTable reports-table">
                        <thead>
                        <tr class="year_roller">
                            <th><a class="white" href="reports/monthly_sales/<?php echo $year - 1; ?>">&lt;&lt;</a></th>
                            <th colspan="10"> <?php echo $year; ?></th>
                            <th><a class="white" href="reports/monthly_sales/<?php echo $year + 1; ?>">&gt;&gt;</a></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="bold text-center"><?= lang("cal_january"); ?></td>
                            <td class="bold text-center"><?= lang("cal_february"); ?></td>
                            <td class="bold text-center"><?= lang("cal_march"); ?></td>
                            <td class="bold text-center"><?= lang("cal_april"); ?></td>
                            <td class="bold text-center"><?= lang("cal_may"); ?></td>
                            <td class="bold text-center"><?= lang("cal_june"); ?></td>
                            <td class="bold text-center"><?= lang("cal_july"); ?></td>
                            <td class="bold text-center"><?= lang("cal_august"); ?></td>
                            <td class="bold text-center"><?= lang("cal_september"); ?></td>
                            <td class="bold text-center"><?= lang("cal_october"); ?></td>
                            <td class="bold text-center"><?= lang("cal_november"); ?></td>
                            <td class="bold text-center"><?= lang("cal_december"); ?></td>
                        </tr>
                        <tr>
                            <?php
                            if (!empty($sales)) {
                                foreach ($sales as $value) {
                                    $array[$value->date] = "<table class='table table-bordered table-hover table-striped table-condensed data' style='margin:0;'><tbody><tr><td>" . $this->lang->line("discount") . "</td></tr><tr><td>" . $this->sma->formatMoney($value->discount) . "</td></tr><tr><td>" . $this->lang->line("shipping") . "</td></tr><tr><td>" . $this->sma->formatMoney($value->shipping) . "</td></tr><tr><td>" . $this->lang->line("product_tax") . "</td></tr><tr><td>" . $this->sma->formatMoney($value->tax1) . "</td></tr><tr><td>" . $this->lang->line("order_tax") . "</td></tr><tr><td>" . $this->sma->formatMoney($value->tax2) . "</td></tr><tr><td>" . $this->lang->line("total") . "</td></tr><tr><td>" . $this->sma->formatMoney($value->total) . "</td></tr></tbody></table>";
                                }
                                for ($i = 1; $i <= 12; $i++) {
                                    echo '<td width="8.3%">';
                                    if (isset($array[$i])) {
                                        echo $array[$i];
                                    } else {
                                        echo '<strong>0</strong>';
                                    }
                                    echo '</td>';
                                }
                            } else {
                                for ($i = 1; $i <= 12; $i++) {
                                    echo '<td width="8.3%"><strong>0</strong></td>';
                                }
                            }
                            ?>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="<?= $assets ?>js/html2canvas.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('#pdf').click(function (event) {
            event.preventDefault();
            window.location.href = "<?=site_url('reports/monthly_sales/'.$year.'/pdf')?>";
            return false;
        });
        $('#image').click(function (event) {
            event.preventDefault();
            html2canvas($('.box'), {
                onrendered: function (canvas) {
                    var img = canvas.toDataURL()
                    window.open(img);
                }
            });
            return false;
        });
    });
</script>
