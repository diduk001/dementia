let input_image;
let input_image_gray;
let input_image_blur;
let input_image_invert;

const block_width_px = 10;
const block_height_px = 10;
let block_cols;
let block_rows;

let last_dementia_slider_val = 0;
let dementia_level_slider;
const max_dementia_level = 100;
let slider_delta;

const n_operators = 1;
let operations = [];
const operators = [fill_black];

let resized = false;

function setup() {
  createCanvas(400, 400);

  file_input = createFileInput(handleFile);
  file_input.parent("file-input-holder");

  dementia_level_slider = createSlider(0, max_dementia_level, 0);
  dementia_level_slider.parent("slider-holder");

  noStroke();
  fill(0, 0, 0);
}

function draw() {
  if (input_image) {
    drawImage();
    // print(input_image);
  }

  dementia_level = dementia_level_slider.value();
  for (var i = 0; i < dementia_level; i++) {
    for (var j = 0; j < slider_delta; j++) {
      const [block_row, block_col, operator] = operations[i * slider_delta + j];
      operators[operator](block_row, block_col);
    }
  }
}

function fill_black(block_row, block_col) {
  var rect_x1 = block_col * block_width_px;
  var rect_y1 = block_row * block_height_px;

  rect(rect_x1, rect_y1, block_width_px, block_height_px);
}

function get_random_block() {
  var block_row = Math.floor(Math.random() * block_rows);
  var block_col = Math.floor(Math.random() * block_rows);
  return [block_row, block_col];
}

function handleFile(file) {
  if (file.type === 'image') {
    input_image = loadImage(file.data);
    // input_image_gray = input_image.get();
    // input_image_gray.filter(GRAY);
    // input_image.hide();

    // resizeCanvas(input_image.width, input_image.height);

    resizeCanvas(input_image.width, input_image.height);


    block_cols = Math.floor(input_image.width / block_width_px);
    block_rows = Math.floor(input_image.height / block_height_px);

    slider_delta = Math.ceil(block_cols * block_rows / max_dementia_level);
    for (let i = 0; i < slider_delta * max_dementia_level; i++) {
      block_row = Math.floor(Math.random() * block_rows);
      block_col = Math.floor(Math.random() * block_cols);
      operator = Math.floor(Math.random() * n_operators);
      operations.push([block_row, block_col, operator]);
    }


  } else {
    alert('Выберите изображение');
  }
}

function drawImage() {
  image(input_image, 0, 0, width, height);
  // image(input_image_gray, 0, 0, width, height);

}
  // if (file.type === "image") {
  //   input_image = createImg(file.data, "");
  //   input_image.hide();

  //   print(input_image);
  //   image(input_image, 0, 0);
  //   input_image_blur = input_image.get();

  //   // input_image_blur.filter(BLUR);

  //   // input_image_blur = copy(input_image, 0, 0, width, height, 0, 0, width, height);
  //   // copy(input_image, input_image_blur, 0, 0, input_image.width, input_image.height, 0, 0, input_image.width, input_image.height);
  //   // copy(input_image, input_image_gray, 0, 0, input_image.width, input_image.height, 0, 0, input_image.width, input_image.height);
  //   // copy(input_image, input_image_invert, 0, 0, input_image.width, input_image.height, 0, 0, input_image.width, input_image.height);

  //   // input_image_blur.filter(BLUR);
  //   // input_image_gray.filter(GRAY);
  //   // input_image_invert.filter(INVERT);
  // } else {
  //   input_image = null;
  // }