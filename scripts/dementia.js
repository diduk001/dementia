let input_image;
let input_image_gray;
let input_image_blur;
let input_image_invert;
let input_image_clone;

const block_width_px = 25;
const block_height_px = 25;
let block_cols;
let block_rows;

let dementia_level_slider;
const max_dementia_level = 200;
let slider_delta;

const n_operators = 4;
let operations = [];
const operators = [fill_black, fill_gray, fill_blur, /*fill_invert,*/ fill_clone];

let save_button;

function setup() {
  createCanvas(400, 400);
  let file_input = createFileInput(handleFile);
  file_input.parent("file-input-holder");

  dementia_level_slider = createSlider(0, max_dementia_level, 0);
  dementia_level_slider.parent("slider-holder");

  save_button = createButton("save image");
  save_button.parent("button-holder");
  save_button.mousePressed(buttonClicked);

  noStroke();
  fill(0, 0, 0);
}

function draw() {
  if (input_image) {
    drawImage();
  }

  dementia_level = dementia_level_slider.value();
  for (var i = 0; i < dementia_level; i++) {
    for (var j = 0; j < slider_delta; j++) {
      const [block_row, block_col, operator] = operations[i * slider_delta + j];
      operators[operator](block_row, block_col);
    }
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    input_image = loadImage(file.data, drawImage);
  }
}

function drawImage() {
  if (width != input_image.width || height != input_image.height) {
    resizeCanvas(input_image.width, input_image.height);

    input_image_gray = input_image.get();
    input_image_gray.filter(GRAY);

    input_image_blur = input_image.get();
    input_image_blur.filter(BLUR);

    // input_image_invert = input_image.get();
    // input_image_invert.filter(INVERT);

    input_image_clone = input_image.get();

    block_cols = Math.floor(input_image.width / block_width_px);
    block_rows = Math.floor(input_image.height / block_height_px);

    operations = [];
    slider_delta = Math.ceil(block_cols * block_rows / max_dementia_level);
    for (let i = 0; i < slider_delta * max_dementia_level; i++) {
      block_row = Math.floor(Math.random() * block_rows);
      block_col = Math.floor(Math.random() * block_cols);
      operator = Math.floor(Math.random() * n_operators);
      operations.push([block_row, block_col, operator]);
    }

    image(input_image, 0, 0, width, height);
  }
}

function fill_black(block_row, block_col) {
  var rect_x1 = block_col * block_width_px;
  var rect_y1 = block_row * block_height_px;

  rect(rect_x1, rect_y1, block_width_px, block_height_px);
}

function fill_gray(block_row, block_col) {
  var rect_x1 = block_col * block_width_px;
  var rect_y1 = block_row * block_height_px;

  copy(input_image_gray, rect_x1, rect_y1, block_width_px, block_height_px, rect_x1, rect_y1, block_width_px, block_height_px);
}

function fill_blur(block_row, block_col) {
  var rect_x1 = block_col * block_width_px;
  var rect_y1 = block_row * block_height_px;

  copy(input_image_blur, rect_x1, rect_y1, block_width_px, block_height_px, rect_x1, rect_y1, block_width_px, block_height_px);
}

function fill_invert(block_row, block_col) {
  var rect_x1 = block_col * block_width_px;
  var rect_y1 = block_row * block_height_px;

  copy(input_image_invert, rect_x1, rect_y1, block_width_px, block_height_px, rect_x1, rect_y1, block_width_px, block_height_px);
}

function fill_clone(block_row, block_col) {
  var rect_x1 = block_col * block_width_px;
  var rect_y1 = block_row * block_height_px;

  var rect_x2 = (block_col + 1) * block_width_px % width;
  var rect_y2 = (block_row) * block_height_px;

  copy(input_image_clone, rect_x2, rect_y2, block_width_px, block_height_px, rect_x1, rect_y1, block_width_px, block_height_px);
}

function get_random_block() {
  var block_row = Math.floor(Math.random() * block_rows);
  var block_col = Math.floor(Math.random() * block_rows);
  return [block_row, block_col];
}

function buttonClicked() {
  saveCanvas('result', 'png');
}