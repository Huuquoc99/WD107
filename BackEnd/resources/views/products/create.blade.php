<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Form</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <h2 class="mb-4">Add New Product</h2>
    <form action="{{ route('products.store') }}" method="post" enctype="multipart/form-data">
        @csrf
        <div class="mt-3">
            <label for="catalogue_id" class="form-label">Catalogues</label>
            <select type="text" class="form-select" name="catalogue_id" id="catalogue_id">
                @foreach($catalogue as $id => $name)
                    <option value="{{ $id }}">{{ $name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" maxlength="255" required>
        </div>

        <div class="form-group">
            <label for="sku">SKU</label>
            <input type="text" class="form-control" id="sku" name="sku" maxlength="255" required>
        </div>
        <div class="form-group">
            <label for="img_thumbnail">Image Thumbnail</label>
            <input type="file" class="form-control-file" id="img_thumbnail" name="img_thumbnail">
        </div>
        <div class="form-group">
            <label for="price_regular">Price Regular</label>
            <input type="number" class="form-control" id="price_regular" name="price_regular" step="0.01" required>
        </div>
        <div class="form-group">
            <label for="price_sale">Price Sale</label>
            <input type="number" class="form-control" id="price_sale" name="price_sale" step="0.01">
        </div>
        <div class="form-group">
            <label for="short_description">Short Description</label>
            <textarea class="form-control" id="short_description" name="short_description" maxlength="255"></textarea>
        </div>

        <div class="mt-5">
            <div class="row">
                @php
                    $is = [
                        'is_active' => 'primary',
                        'is_hot_deal' => 'danger',
                        'is_good_deal' => 'warning',
                        'is_new' => 'success',
                        'is_show_home' => 'info',
                    ];
                @endphp

                @foreach($is as $key => $color)
                    <div class="col-md-2">
                        <div class="form-check form-switch form-switch-{{ $color }}">
                            <input class="form-check-input" type="checkbox" role="switch"
                                   name="{{ $key }}" value="1" id="{{ $key }}" @if($key == 'is_active') checked @endif>
                            <label class="form-check-label"
                                   for="{{ $key }}">{{ \Str::convertCase($key, MB_CASE_TITLE) }}</label>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Biến thể</h4>
                    </div><!-- end card header -->
                    <div class="card-body" style="height: 450px; overflow: scroll">
                        <div class="live-preview">
                            <div class="row gy-4">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <tr class="text-center">
                                            <th>Size</th>
                                            <th>Color</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>SKU</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                        </tr>

                                        @foreach($capacity as $capacityID => $sizeName)
                                            @php($flagRowspan = true)

                                            @foreach($colors as $colorID => $colorName)
                                                <tr class="text-center">

                                                    @if($flagRowspan)
                                                        <td style="vertical-align: middle;"
                                                            rowspan="{{ count($colors) }}"><b>{{ $sizeName }}</b></td>
                                                    @endif
                                                    @php($flagRowspan = false)

                                                    <td>
                                                        {{$colorName}}
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control"
                                                               value="0"
                                                               name="product_variants[{{ $capacityID . '-' . $colorID }}][quantity]">
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control"
                                                               value="0"
                                                               name="product_variants[{{ $capacityID . '-' . $colorID }}][price]">
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control"
                                                               value="0"
                                                               name="product_variants[{{ $capacityID . '-' . $colorID }}][sku]">
                                                    </td>

                                                    <td>
                                                        <input type="file" class="form-control"
                                                               name="product_variants[{{ $capacityID . '-' . $colorID }}][image]">
                                                    </td>
                                                        <td>
                                                            <input type="hidden" name="product_variants[{{ $capacityID . '-' . $colorID }}][status]" value="0">
                                                            <input type="checkbox" class="form-control"
                                                                   name="product_variants[{{ $capacityID . '-' . $colorID }}][status]" value="1">
                                                        </td>

                                                </tr>
                                            @endforeach
                                        @endforeach
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!--end col-->
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Gallery</h4>
                        <button type="button" class="btn btn-primary" onclick="addImageGallery()">Thêm ảnh</button>
                    </div><!-- end card header -->
                    <div class="card-body">
                        <div class="live-preview">
                            <div class="row gy-4" id="gallery_list">
                                <div class="col-md-4" id="gallery_default_item">
                                    <label for="gallery_default" class="form-label">Image</label>
                                    <div class="d-flex">
                                        <input type="file" class="form-control" name="product_galleries[]"
                                               id="gallery_default">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Thông tin thêm</h4>
                        </div><!-- end card header -->
                        <div class="card-body">
                            <div class="live-preview">
                                <div class="row gy-4">
                                    <div class="col-md-12">
                                        <div>
                                            <label for="tags" class="form-label">Tags</label>
                                            <select class="form-select" name="tags[]" id="tags" multiple>
                                                @foreach($tags as $id => $name)
                                                    <option value="{{ $id }}">{{ $name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end col-->
        </div>

        <button class="btn btn-primary">Submit</button>
    </form>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<script>
    CKEDITOR.replace('content');

    function addImageGallery() {
        let id = 'gen' + '_' + Math.random().toString(36).substring(2, 15).toLowerCase();
        let html = `
                <div class="col-md-4" id="${id}_item">
                    <label for="${id}" class="form-label">Image</label>
                    <div class="d-flex">
                        <input type="file" class="form-control" name="product_galleries[]" id="${id}">
                        <button type="button" class="btn btn-danger" onclick="removeImageGallery('${id}_item')">
                            <span class="bx bx-trash"></span>
                        </button>
                    </div>
                </div>
            `;

        $('#gallery_list').append(html);
    }

    function removeImageGallery(id) {
        if (confirm('Chắc chắn xóa không?')) {
            $('#' + id).remove();
        }
    }
</script>
</body>
</html>
