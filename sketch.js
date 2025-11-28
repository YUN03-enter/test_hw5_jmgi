let preSum;
let preNum;
let preMax;
let years = [];
let monthNum = {};
let monthSum = {};
let monthMax = {};
let months = ["JAN", "FEB", "MAR", "APR", "MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
let show_ = 'defaultMode';
let printGraph = true;

function preload() {
  preSum = loadTable('preSum.csv', 'csv','header')
  preNum = loadTable('preNum.csv', 'csv','header')
  preMax = loadTable('preMax.csv', 'csv','header')
}

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  for (let r=0; r<12;r++) {
    let monthlabel = months[r];
    monthNum[monthlabel] = [];
    monthSum[monthlabel] = [];
    monthMax[monthlabel] = [];
  }
  
  for(let r=0; r<preNum.getRowCount();r++){
    let year_ = preNum.getNum(r, 'YEAR')
    years.push(year_);
    
    for (let monthName of Object.keys(monthNum)) {
      monthNum[monthName].push(preNum.getNum(r, monthName));
      monthSum[monthName].push(preSum.getNum(r, monthName));
      monthMax[monthName].push(preMax.getNum(r, monthName))
    }
  }

  monthNum.NOV.pop()
  monthNum.DEC.pop()
  monthSum.NOV.pop()
  monthSum.DEC.pop()
  monthMax.NOV.pop()
  monthMax.DEC.pop()

}

function draw() {
  background(220);
  stroke(0);
  fill(255);
  triangle(20,10,10,20,30,20);
  rect(10,20,20,10);
  textSize(10);
  noStroke();
  fill(0);
  text('홈버튼을 누르면 메인 화면으로 돌아갑니다.', 125, 15);
  text("'ENTER'키를 누르면 다른 지표를 확인할 수 있습니다.", 145,25);
  if (mouseIsPressed && ((mouseX - 15)**2 + (mouseY - 25)**2)<=200) {show_ = 'defaultMode'} 
  if (show_ == 'defaultMode') {
    defaultFun();
  }
  else {
    for (let monthLabel of months){
      if (show_ == monthLabel)
        drawGraph(monthLabel)
    }
  }
  
}

function defaultFun() {
  printGraph = true
  stroke(0);
  let  d = width/6
  for(idx=0;idx<6;idx++){
    let x = d*idx + (d/2)
    let y = height/3
    fill(255);
    circle(x, y,80);
    fill(0)
    textSize(30);
    text(months[idx], x, y)
     if (mouseIsPressed && ((mouseX-x)**2 + (mouseY - y)**2) <= 1600) {
      show_ = months[idx]
      }
  }
  for(idx=6;idx<12;idx++){
    fill(255);
    let x = d*(idx-6) + (d/2)
    let y = 2*height/3
    circle(x, y,80);
    fill(0);
    textSize(30);
    text(months[idx], x, y)
    if (mouseIsPressed && ((mouseX-x)**2 + (mouseY - y)**2) <= 1600) {
      show_ = months[idx]
      }
  
  }

}

function keyPressed() {
  if(keyCode === ENTER) {
   printGraph = !printGraph 
  }
}

function drawGraph(_monthLabel){
  fill(0);
  textSize(20);
  stroke(0);
  let _title = `${_monthLabel}: 강수 그래프` 
  text(_title, width/2, 20);
  
  let margin = 80
  let chartW = width - (2*margin);
  let baselineY = height - margin;
  let _monthNum = monthNum[_monthLabel]
  let _monthSum = monthSum[_monthLabel]
  let _monthMax = monthMax[_monthLabel]
  let _maxSumValue = 0
  let _maxMaxValue = 0
  let _maxNumValue = 0
  let _xpos = []
  let _ypos = []
  let _years;

  if (_monthLabel == 'NOV' || _monthLabel == 'DEC') {
    _years = [];
    for(let idx=0; idx<years.length-1;idx++){
      _years[idx] = years[idx]
    }}
  else {
    _years = years
  }
  
  for (let i=0; i<_years.length;i++){ 
     
    if(_maxSumValue <= _monthSum[i]) {
      _maxSumValue = _monthSum[i]
    }
  
    if (_maxMaxValue <= _monthMax[i]){
      _maxMaxValue = _monthMax[i]
    }
    
    if (_maxNumValue <= _monthNum[i]) {
      _maxNumValue = _monthNum[i]
    }
  }
  
  stroke(0);
  line(margin, baselineY,width-margin, baselineY);
  let barW = chartW / _years.length 

  let dotGraph;
  let maxDot;
  let dotColor;
  if (printGraph) {
    dotGraph = _monthMax;
    maxDot = _maxMaxValue;
    dotColor = color(150,0,0);
    
    if(_monthLabel != 'NOV') {
      noStroke();
      fill(150,0,0);
      circle(45,80,20);
      fill(0);
      textSize(10);
      text('일최다강수량(mm)', 110, 80);
      noStroke();
      fill(0,0,150);
      rect(30,40,30,20);
      fill(0);
      textSize(10);
      text('월누적강수량(mm)', 110,50);}
    else {
      noStroke();
      fill(150,0,0);
      circle(645,80,20);
      fill(0);
      textSize(10);
      text('일최다강수량(mm)', 710, 80);
      noStroke();
      fill(0,0,150);
      rect(630,40,30,20);
      fill(0);
      textSize(10);
      text('월누적강수량(mm)', 710,50);} }
  else {
    dotGraph = _monthNum;
    maxDot = _maxNumValue;
    dotColor = color(0,150,0);
    if (_monthLabel != 'NOV') {
      noStroke();
      fill(0,0,150);
      rect(30,40,30,20);
      fill(0);
      textSize(10);
      text('월누적강수량(mm)', 110,50);
      noStroke();
      fill(0,150,0);
      circle(45,80,20);
      fill(0);
      textSize(10);
      text('강수일수(day)', 100, 80); }
    else {
      noStroke();
      fill(0,0,150);
      rect(630,40,30,20);
      fill(0);
      textSize(10);
      text('월누적강수량(mm)', 710,50);
      noStroke();
      fill(0,150,0);
      circle(645,80,20);
      fill(0);
      textSize(10);
      text('강수일수(day)', 700, 80);
    }
  }
 
  for(let i =0; i<_years.length;i++){
    let dotH = map(dotGraph[i], 0, maxDot, 0, height-(2*margin));
    let barX = margin + (i + 0.1) * barW ;
    let barH = map(_monthSum[i], 0, _maxSumValue, 0, height - (2*margin));
    let barY = baselineY - barH
    stroke(0);
    fill(0,0,150);
    rect(barX, barY, 0.8* barW, barH);
    fill(0);
    textSize(15);
    text(_years[i], barX + 0.4 * barW, baselineY+(0.3*margin));
    fill(0);
    textSize(10);
    text(_monthSum[i].toFixed(2), barX + 0.4 * barW, barY - 10);
    
    fill(dotColor);
    noStroke();
    circle(barX + 0.4 * barW, baselineY - dotH, 10);
    let _x = barX + 0.4 * barW
    let _y = baselineY - dotH
    _xpos.push(_x);
    _ypos.push(_y)
  }
  
  for(let i =0; i<_xpos.length-1;i++) {
    stroke(dotColor);
    line(_xpos[i], _ypos[i], _xpos[i+1], _ypos[i+1]);
    } 
  
  for (let i = 0; i<_xpos.length;i++) {
    let _dis = (mouseX - _xpos[i])**2 + (mouseY - _ypos[i])**2
    if (_dis <= 100) {
      noFill();
      stroke(0);
      circle(_xpos[i], _ypos[i], 15);
      fill(255);
      noStroke();
      rect(_xpos[i]-20, _ypos[i]-25, 40,20)
      fill(0);
      textSize(15);
      fill(dotColor);
      text(dotGraph[i], _xpos[i], _ypos[i] - 15);
    }
  }
    
}
