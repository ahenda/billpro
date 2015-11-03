<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <base href="<?= site_url() ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $product->name ?> - <?= $Settings->site_name ?></title>
    <link href="<?= $assets ?>styles/helpers/bootstrap.min.css" rel="stylesheet"/>
<body>
<div class="row">
    <div class="col-lg-12">
        <div class="text-center" style="margin-bottom:20px;">
            <img src="<?= base_url() . 'assets/uploads/logos/' . $Settings->logo; ?>"
                 alt="<?= $Settings->site_name; ?>">
        </div>
        <div class="clearfix"></div>
        <?php $this->sma->qrcode('link', urlencode(site_url('products/view/' . $product->id)), 2); ?>
        <img src="<?= base_url() ?>assets/uploads/qrcode<?= $this->session->userdata('user_id') ?>.png"
             alt="<?= site_url('products/view/' . $product->id); ?>" style="float:right;"/>
        <?php $br = $this->sma->save_barcode($product->code, $product->barcode_symbology, 70, false); ?>
        <img src="<?= base_url() ?>assets/uploads/barcode<?= $this->session->userdata('user_id') ?>.png"
             alt="<?= $product->code ?>" style="float:right;"/>

        <div class="clearfix"></div>
        <div class="row">
            <div class="col-sm-5">
                <?php if ($product->image != 'no_image.png') { ?><img
                    src="<?= base_url() ?>assets/uploads/<?= $product->image ?>" alt="<?= $product->name ?>"
                    class="img-responsive img-thumbnail" /><?php } ?>
            </div>
            <div class="col-sm-7">
                <div class="clearfix"></div>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped dfTable table-right-left">
                        <tbody>
                        <tr>
                            <td><?php echo $this->lang->line("product_type"); ?></td>
                            <td><?php echo lang($product->type); ?></td>
                        </tr>
                        <tr>
                            <td><?php echo $this->lang->line("product_name"); ?></td>
                            <td><?php echo $product->name; ?></td>
                        </tr>
                        <tr>
                            <td><?php echo $this->lang->line("product_code"); ?></td>
                            <td><?php echo $product->code; ?></td>
                        </tr>
                        <tr>
                            <td><?php echo $this->lang->line("category"); ?></td>
                            <td><?php echo $category->name; ?></td>
                        </tr>
                        <?php if ($product->subcategory_id) { ?>
                            <tr>
                                <td><?php echo $this->lang->line("subcategory"); ?></td>
                                <td><?php echo $subcategory->name; ?></td>
                            </tr>
                        <?php } ?>
                        <tr>
                            <td><?php echo $this->lang->line("product_unit"); ?></td>
                            <td><?php echo $product->unit; ?></td>
                        </tr>
                        <?php if ($Owner || $Admin) {
                            echo '<tr><td>' . $this->lang->line("product_cost") . '</td><td>' . $this->sma->formatMoney($product->cost) . '</td></tr>';
                            echo '<tr><td>' . $this->lang->line("product_price") . '</td><td>' . $this->sma->formatMoney($product->price) . '</td></tr>';
                        } else {
                            if ($this->session->userdata('show_cost')) {
                                echo '<tr><td>' . $this->lang->line("product_cost") . '</td><td>' . $this->sma->formatMoney($product->cost) . '</td></tr>';
                            }
                            if ($this->session->userdata('show_price')) {
                                echo '<tr><td>' . $this->lang->line("product_price") . '</td><td>' . $this->sma->formatMoney($product->price) . '</td></tr>';
                            }
                        }
                        ?>

                        <?php if ($product->tax_rate) { ?>
                            <tr>
                                <td><?php echo $this->lang->line("tax_rate"); ?></td>
                                <td><?php echo $tax_rate->name; ?></td>
                            </tr>
                            <tr>
                                <td><?php echo $this->lang->line("tax_method"); ?></td>
                                <td><?php echo $product->tax_method == 0 ? lang('inclusive') : lang('exclusive'); ?></td>
                            </tr>
                        <?php } ?>
                        <?php if ($product->alert_quantity != 0) { ?>
                            <tr>
                                <td><?php echo $this->lang->line("alert_quantity"); ?></td>
                                <td><?php echo $this->sma->formatQuantity($product->alert_quantity); ?></td>
                            </tr>
                        <?php } ?>
                        <?php if ($variants) { ?>
                            <tr>
                                <td><?php echo $this->lang->line("product_variants"); ?></td>
                                <td><?php foreach ($variants as $variant) {
                                        echo '<span class="label label-primary">' . $variant->name . '</span> ';
                                    } ?></td>
                            </tr>
                        <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-5">
                        <?php if ($product->cf1 || $product->cf2 || $product->cf3 || $product->cf4 || $product->cf5 || $product->cf6) { ?>
                            <h3 class="bold"><?= lang('custom_fields') ?></h3>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-condensed dfTable two-columns">
                                    <thead>
                                    <tr>
                                        <th><?= lang('custom_field') ?></th>
                                        <th><?= lang('value') ?></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    if ($product->cf1) {
                                        echo '<tr><td>' . lang("pcf1") . '</td><td>' . $product->cf1 . '</td></tr>';
                                    }
                                    if ($product->cf2) {
                                        echo '<tr><td>' . lang("pcf2") . '</td><td>' . $product->cf2 . '</td></tr>';
                                    }
                                    if ($product->cf3) {
                                        echo '<tr><td>' . lang("pcf3") . '</td><td>' . $product->cf3 . '</td></tr>';
                                    }
                                    if ($product->cf4) {
                                        echo '<tr><td>' . lang("pcf4") . '</td><td>' . $product->cf4 . '</td></tr>';
                                    }
                                    if ($product->cf5) {
                                        echo '<tr><td>' . lang("pcf5") . '</td><td>' . $product->cf5 . '</td></tr>';
                                    }
                                    if ($product->cf6) {
                                        echo '<tr><td>' . lang("pcf6") . '</td><td>' . $product->cf6 . '</td></tr>';
                                    }
                                    ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php } ?>
                        <?php if ($product->type == 'combo') { ?>
                            <h3 class="bold"><?= lang('combo_items') ?></h3>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-condensed dfTable two-columns">
                                    <thead>
                                    <tr>
                                        <th><?= lang('product_name') ?></th>
                                        <th><?= lang('quantity') ?></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php foreach ($combo_items as $combo_item) {
                                        echo '<tr><td>' . $combo_item->name . ' (' . $combo_item->code . ') </td><td>' . $this->sma->formatQuantity($combo_item->qty) . '</td></tr>';
                                    } ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php } ?>

                        <?php if ((!$Supplier || !$Customer) && !empty($warehouses) && $product->type == 'standard') { ?>
                            <h3 class="bold"><?= lang('warehouse_quantity') ?></h3>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-condensed dfTable two-columns">
                                    <thead>
                                    <tr>
                                        <th><?= lang('warehouse_name') ?></th>
                                        <th><?= lang('quantity') . ' (' . lang('rack') . ')'; ?></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php foreach ($warehouses as $warehouse) {
                                        if ($warehouse->quantity != 0) {
                                            echo '<tr><td>' . $warehouse->name . ' (' . $warehouse->code . ')</td><td><strong>' . $this->sma->formatQuantity($warehouse->quantity) . '</strong>' . ($warehouse->rack ? ' (' . $warehouse->rack . ')' : '') . '</td></tr>';
                                        }
                                    } ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="col-sm-7">
                        <?php if (!empty($options)) { ?>
                            <h3 class="bold"><?= lang('product_variants_quantity'); ?></h3>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-condensed dfTable">
                                    <thead>
                                    <tr>
                                        <th><?= lang('warehouse_name') ?></th>
                                        <th><?= lang('product_variant'); ?></th>
                                        <th><?= lang('quantity') . ' (' . lang('rack') . ')'; ?></th>
                                        <?php /* if($Owner || $Admin) {
                                            echo '<th>'.lang('cost').'</th>';
                                            echo '<th>'.lang('price').'</th>';
                                        } */ ?>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    foreach ($options as $option) {
                                        if ($option->wh_qty != 0) {
                                            echo '<tr><td>' . $option->wh_name . '</td><td>' . $option->name . '</td><td class="text-center">' . $this->sma->formatQuantity($option->wh_qty) . '</td>';
                                            /*if($Owner || $Admin && (!$Customer || $this->session->userdata('show_cost'))) {
                                                echo '<td class="text-right">'.$this->sma->formatMoney($option->cost).'</td><td class="text-right">'.$this->sma->formatMoney($option->price).'</td>';
                                            }*/
                                            echo '</tr>';
                                        }

                                    }
                                    ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>

            <div class="col-sm-12">

                <?= $product->details ? '<div class="panel panel-success"><div class="panel-heading">' . lang('product_details_for_invoice') . '</div><div class="panel-body">' . $product->details . '</div></div>' : ''; ?>
                <?= $product->product_details ? '<div class="panel panel-primary"><div class="panel-heading">' . lang('product_details') . '</div><div class="panel-body">' . $product->product_details . '</div></div>' : ''; ?>

            </div>
        </div>

        <?php
        if (!empty($images)) {
            foreach ($images as $ph) {
                echo '<img class="img-responsive" src="' . base_url() . 'assets/uploads/' . $ph->photo . '" alt="' . $ph->photo . '" style="width:' . $Settings->iwidth . 'px; height:' . $Settings->iheight . 'px;" />';
            }
        }
        ?>
    </div>
</div>
</body>
</html>
