// Collection -> Word -> Letter -> Ball
// 用图片来做letter



function Ball(v, father) {
  this.pos2 = v;

  this.v = new Vector2(0, 1);
  this.a = 0;

  this.father = father;
  // this.color = 'red';
  this.r = 1;

  this.state = 1;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  // ctx.fillStyle = this.color;
  ctx.fillStyle = this.father.color;
  ctx.arc(this.pos2.x, this.pos2.y, this.r, 0, Math.PI * 2);
  ctx.fill();
};

Ball.prototype.update = function() {
  if(game.isOver) return;
  // 改做平抛运动
  if(this.state === 2) {
    this.a = 10 / 1000 * 60;
    // this.v.x = getRandomNum(-10, 10);
    this.v.x = - 10 + Math.random() * 20; 
    this.state = 3;
  }
    // this.pos2.y++;
  this.v.y += this.a;
  this.pos2.x += this.v.x;
  this.pos2.y += this.v.y;

  // 判断游戏结束
  if(this.state === 1 && this.pos2.y > height) {
    clearInterval(handle);
    game.isOver = true;
    alert('game over');
  }
};

// 当ball做平抛运动出边界时，下一帧无需继续渲染
Ball.prototype.kill = function() {

};
// 
function Letter(a, dis) {
  this.letter = a;
  this.balls = [];

  this.color = 'green';

  this.getBalls(dis);
}

Letter.prototype.getBalls = function(dis) {
  // 离屏canvas
  var ocanvas = document.createElement('canvas'); 
  // document.body.appendChild(ocanvas); 
  ocanvas.height = window.innerHeight;
  ocanvas.width = window.innerWidth;
  var octx = ocanvas.getContext('2d');

  octx.font = " 1px Monospace"
  // octx.fontFamily = "Times New Roman"
  octx.textAlign = "left";
  octx.textBaseline = "top";
  octx.fillStyle = 'red';
  octx.fillText(this.letter, 0, 0);


  var data = octx.getImageData(0, 0, canvas.width, canvas.height).data;
  var length = data.length;
  // var textPoint = [];
  for (var i = 0, wl = canvas.width * 4; i < length; i += 4) {
    if (data[i + 3]) {  // 根据透明度判断
      var x = (i % wl) / 4;
      var y = parseInt(i / wl)
  //     this.textPoint.push([x * 10, y * 10]);
      this.balls.push(new Ball(new Vector2(dis + x * 2, y * 2), this));
    }
  }
};

Letter.prototype.disappear = function() {
  for(var i = 0; i < this.balls.length; i++)
    this.balls[i].state = 2;
};

Letter.prototype.draw = function() {
  for(var i = 0, len = this.balls.length; i < len; i++)
    this.balls[i].draw();
};

Letter.prototype.update = function() {
  for(var i = 0, len = this.balls.length; i < len; i++)
    this.balls[i].update();
};

// 
function Word(a) {
  this.word = a;
  // this.textPoint = [];
  this.letters = [];

  // this.getBalls();
  this.getLetters();
}

Word.prototype.getLetters = function() {
  ctx.font = " 1px Monospace";
  var offset = getRandomNum(0, width - ctx.measureText(this.word).width * 2);
  for(var i = 0; i < this.word.length; i++) {
    // alert(this.word.length)
    
    
    // alert(ans)
    this.letters.push(new Letter(this.word.charAt(i), offset))
    var text = this.word.charAt(i);
    // alert(ctx.measureText(text).width)

    offset += ctx.measureText(text).width * 2;
    // console.log(offset)
  }


};

// Word.
// word消失做平抛运动，实质还是ball的运动
Word.prototype.disappear = function(id) { 
  // game.stage.words.splice(id, 1)
  for(var i = 0; i < this.letters.length; i++) {
    var l = this.letters[i];
    l.disappear();
  }
};

Word.prototype.draw = function() {
  // ctx.clearRect(0, 0, width, height);
  for(var i = 0, len = this.letters.length; i < len; i++)
    this.letters[i].draw();
};

Word.prototype.update = function() {
  for(var i = 0, len = this.letters.length; i < len; i++)
    this.letters[i].update();
};
// // }

function Collection() {
  this.words = [];
};

Collection.prototype.draw = function() {
  ctx.clearRect(0, 0, width, height);
  for(var i = 0, len = this.words.length; i < len; i++)
    this.words[i].draw();
};

Collection.prototype.update = function() {
  for(var i = 0, len = this.words.length; i < len; i++)
    this.words[i].update();
};
