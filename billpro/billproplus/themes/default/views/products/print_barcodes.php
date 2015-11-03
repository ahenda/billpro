<script type="text/javascript">
    $(document).ready(function () {
        $('#category').val('<?=$category_id?>');
        $('#category').change(function () {
            window.location.replace("<?php echo site_url('products/print_barcodes'); ?>/" + $(this).val());
            return false;
        });
    });
</script>
<div class="box">
    <div class="box-header no-print">
        <h2 class="blue"><i class="fa-fw fa fa-plus"></i><?= lang('print_barcodes'); ?></h2>

        <div class="box-icon">
            <ul class="btn-tasks">
                <li class="dropdown"><a href="javascript:void();" onclick="window.print();" id="print-icon" class="tip"
                                        title="<?= lang('print') ?>"><i class="icon fa fa-print"></i></a></li>
            </ul>
        </div>
    </div>
    <div class="box-content">
        <div class="row">
            <div class="col-lg-12">
                <p class="introtext"><?php echo lang('print_barcode_heading'); ?></p>

                <div class="well well-sm no-print">
                    <?php
                    $cat[''] = $this->lang->line("select") . " " . $this->lang->line("category");
                    foreach ($categories as $category) {
                        $cat[$category->id] = $category->name;
                    }
                    echo form_dropdown('category', $cat, $category, 'class="tip form-control" id="category" placeholder="' . $this->lang->line("select") . " " . $this->lang->line("category") . '" required="required"');
                    ?>

                    <div class="clearfix"></div>
                </div>
                <?php if ($r != 1) { ?>

                    <?php if (!empty($links)) {
                        echo '<div class="text-center">' . $links . '</div>';
                    } ?>
                    <?php echo $html; ?>
                    <?php if (!empty($links)) {
                        echo '<div class="text-center">' . $links . '</div>';
                    } ?>
                <?php
                } else {
                    echo '<h3>' . $this->lang->line('empty_category') . '</h3>';
                }
                ?>
            </div>
        </div>
    </div>
</div>