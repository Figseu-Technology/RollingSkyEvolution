const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa, 1);

const canvas = $('#canvascontainer').append(renderer.domElement);
let distance = 4;
let started = false;
let percent = 0;
camera.position.set(0, 5, distance);
camera.rotation.x -= 0.75;
let scoreSubmitted = false;
let level = 1;
let star = 0;
let wave = 0;
let wave_t = 0;
let wave_th = 0;
let wave_f = 0;
let wave_fi = 0;
let wave_s = 0;
let wave_se = 0;
wave = $.cookie('e_wave');
wave_t = $.cookie('e_wave_t');
wave_th = $.cookie('e_wave_th');
wave_f = $.cookie('e_wave_f');
wave_fi = $.cookie('e_wave_fi');
wave_s = $.cookie('e_wave_s');
wave_se = $.cookie('e_wave_se');
let train = Math.floor( Math.random() * 11 );
let url = location.href;
let fgnc = url.substr( 68 );
let data;
let reqId;
$.getJSON('GWbmsGTFSxKPGRfgbeNgXJzSgzQfbLPjZxwuVKWGbCDNz9PmKrS4trK9GGJhFNk2KTCybmrxwpB.json', d => {
  data = d;
  loadLevel(level);
  $('#play').show();
  $('#PresentCode').hide();
  $('#play').click(start);
  $('#next').show();
  $('#score').hide();
  $('#level-d').html('ボーナスステージ');
  $('#level').html('Maison');
  $('#stars').html('☆☆☆☆☆☆☆☆');
  $('#Waves').html('☆ × ' + $.cookie('e_wave'));
  reqId = requestAnimationFrame(render);
  console.clear();
  console.log(
    "超高難度 - The Ruby　血祭りの時間だ"
  );
});

//start function
function start(e) {
  e.preventDefault();
  if (!started) {
    started = true;
    ball.speed.z = -0.15;
    $('#main').fadeOut(300);
    $('#name').hide();
     if (typeof wave == 'undefined') {
        wave = 0;
        $.cookie('e_wave', wave, { expires: 30 });
     }
     if (typeof wave_t == 'undefined') {
        wave_t = 0;
        $.cookie('e_wave_t', wave_t, { expires: 30 });
     }
     if (typeof wave_th == 'undefined') {
        wave_th = 0;
        $.cookie('e_wave_th', wave_th, { expires: 30 });
     }
     if (typeof wave_f == 'undefined') {
        wave_f = 0;
        $.cookie('e_wave_f', wave_f, { expires: 30 });
     }
     if (typeof wave_fi == 'undefined') {
        wave_fi = 0;
        $.cookie('e_wave_fi', wave_fi, { expires: 30 });
     }
     if (typeof wave_s == 'undefined') {
        wave_s = 0;
        $.cookie('e_wave_s', wave_s, { expires: 30 });
     }
     if (typeof wave_se == 'undefined') {
        wave_se = 0;
        $.cookie('e_wave_se', wave_se, { expires: 30 });
     }
    if (level == 1) {
        $('#mai').get(0).play();
        wave++;
    } else if (level == 2) {
            $('#edu').get(0).play();
            wave_t++;
    } else if (level == 3) {
            $('#prin').get(0).play();
            wave_th++;
    } else if (level == 4) {
            $('#los').get(0).play();
            wave_f++;
    } else if (level == 5) {
            $('#alive').get(0).play();
            wave_fi++;
    } else if (level == 6) {
            $('#clo').get(0).play();
            wave_s++;
    } else if (level == 7) {
            $('#clo').get(0).play();
            wave_se++;
    } else {
            $('#cloud').get(0).play();
    }
    reset();
    world.forEach(v => {
      if (v instanceof Bouncer) {
        v.line.position.y = 0;
      }
    });
    world.forEach(v => {
      if (v instanceof Mysterybox) {
        v.mesh.position.y = 1.1;
      }
    });
    world.forEach(v => {
      if (v instanceof Gem) {
        v.mesh.position.y = 1.1;
      }
    });
    $('#main').css('pointer-events', 'none');
  }
}
function reset() {
  ball.landed = true;
  ball.tmpZ = 0;
  camera.position.set(0, 5, distance);
  ball.mesh.position.set(0, 0.6, 0);
  ball.speed.y = 0;
  ball.count2Lose = 0;
}

function nextLevel() {
  percent = 0;
  star = 0;
  while (
    (selectedObject = scene.getObjectByName('level component')) !== undefined
  ) {
    scene.remove(selectedObject);
  }
  world.length = 0;
  level++;
  loadLevel(level);
  reset();
  $('#score').hide();
  $('#level').show();
  $('#stars').show();
  $('#prev').show();
  $('#retry').hide();
  $('#play').show();
  if (level == 5) {
    $('#next').hide();
  }
  if (level == 1) {
      $('#level-d').html('ボーナスステージ');
      $('#level').html('Maison');
      $('#stars').html('☆☆☆☆☆☆☆☆');
      $('#Waves').html('☆ × ' + $.cookie('e_wave'));
     } else if (level == 2) {
         $('#level-d').html('ボーナスステージ');
         $('#level').html('輪廻転生');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_t'));
        } else if (level == 3) {
         $('#level-d').html('ボーナスステージ');
         $('#level').html('雷光の姫君');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_th'));
        } else if (level == 4) {
         $('#level-d').html('ボーナスステージ');
         $('#level').html('The Eden');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_f'));
        } else if (level == 5) {
         $('#level-d').html('ボーナス ステージ');
         $('#level').html('Stay Alive');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_fi'));
        } else {
            $('#level-d').html('開発中');
            $('#level').html('Level ' + level);
            $('#stars').html('');
           }
}

function prevLevel() {
  percent = 0;
  star = 0;
  while (
    (selectedObject = scene.getObjectByName('level component')) != undefined
  ) {
    scene.remove(selectedObject);
  }
  world.length = 0;
  level--;
  loadLevel(level);
  reset();
  $('#score').hide();
  $('#level').show();
  $('#stars').show();
  $('#next').show();
  $('#retry').hide();
  $('#play').show();
  if (level == 1) {
    $('#prev').hide();
  }
  if (level == 1) {
      $('#level-d').html('ボーナスステージ');
      $('#level').html('Maison');
      $('#stars').html('☆☆☆☆☆☆☆☆');
      $('#Waves').html('☆ × ' + $.cookie('e_wave'));
     } else if (level == 2) {
         $('#level-d').html('ボーナスステージ');
         $('#level').html('輪廻転生');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_t'));
        } else if (level == 3) {
         $('#level-d').html('ボーナスステージ');
         $('#level').html('雷光の姫君');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_th'));
        } else if (level == 4) {
         $('#level-d').html('ボーナスステージ');
         $('#level').html('The Eden');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_f'));
        } else if (level == 5) {
         $('#level-d').html('ボーナス ステージ');
         $('#level').html('Stay Alive');
         $('#stars').html('☆☆☆☆☆☆☆☆');
         $('#Waves').html('☆ × ' + $.cookie('e_wave_fi'));
        } else {
            $('#level-d').html('開発中');
            $('#level').html('Level ' + level);
            $('#stars').html('');
           }
}

const light = new THREE.HemisphereLight(0xeeeeee, 0x777777);
scene.add(light);
const world = [];
function loadLevel(level) {
  const index = level - 1;
  renderer.setClearColor(parseInt(data[index].background));
  ball.mesh.material.color.setHex(parseInt(data[index].ball));
  scene.fog = new THREE.Fog(parseInt(data[index].background), 10, 50);
  for (var i in data[index].data) {
    for (var j in data[index].data[i]) {
      switch (data[index].data[i][j]) {
        case 1:
          world.push(new Mat(j - 2, -i, data[index].mat));
          break;
        case 2:
          world.push(new Bouncer(j - 2, -i, data[index].bouncer));
          break;
        case 3:
          world.push(new Obstacle(j - 2, -i, data[index].obstacle));
          break;
        case 4:
          world.push(new Obstacle(j - 2, -i, data[index].obstacle));
          world.push(new Dreamcube(j - 2, -i, data[index].obstacle));
          break;
        case 5:
          world.push(new Mat(j - 2, -i, data[index].mat));
          world.push(new Skyobstacle(j - 2, -i, data[index].obstacle));
          break;
        case 6:
          world.push(new Trskyobstacle(j - 2, -i, data[index].obstacle));
          break;
        case 7:
          world.push(new Mat(j - 2, -i, data[index].mat));
          world.push(new Mysterybox(j - 2, -i, data[index].bouncer));
          break;
        case 8:
          world.push(new Mat(j - 2, -i, data[index].mat));
          world.push(new Gem(j - 2, -i, data[index].bouncer));
          break;
        case 9:
          world.push(new Goal(j - 2, -i, data[index].obstacle));
          break;
        case 210:
          world.push(new Dreamtower(j - 2, -i, data[index].obstacle));
          world.push(new Crystal(j - 2, -i, data[index].obstacle));
          break;
      }
    }
  }
}

var ball = new Ball();

keystate = [];
//Loop function
function render() {
  renderer.render(scene, camera);
  ball.update();
  percent = Math.ceil(
    Math.abs(ball.mesh.position.z) / data[level - 1].data.length * 100
  );
  percent = percent > 100 ? 100 : percent;
  $('#percent').html(percent + '%');
  if (keystate[37]) ball.mesh.position.x -= 0.15;
  if (keystate[39]) ball.mesh.position.x += 0.15;
  reqId = requestAnimationFrame(render);
};

//controls

function gameover() {
  if (star == 1) {
     if (level == 1) {
     wave = 0;
     } else if (level == 2) {
     wave_t = 0;
     } else if (level == 3) {
     wave_th = 0;
     } else if (level == 4) {
     wave_f = 0;
     } else if (level == 5) {
     wave_fi = 0;
     } else if (level == 6) {
     wave_s = 0;
     } else if (level == 7) {
     wave_se = 0;
     }
  }
  $.cookie('e_wave', wave, { expires: 252 });
  $.cookie('e_wave_t', wave_t, { expires: 252 });
  $.cookie('e_wave_th', wave_th, { expires: 252 });
  $.cookie('e_wave_f', wave_f, { expires: 252 });
  $.cookie('e_wave_fi', wave_fi, { expires: 252 });
  $.cookie('e_wave_s', wave_s, { expires: 252 });
  $.cookie('e_wave_se', wave_se, { expires: 252 });
  started = false;
  ball.speed.z = 0;
  $('#main').fadeIn(500);
  $('#retry').hide();
  $('#play').show();
  $('#play').click(start);
  $('#level').show();
  $('#stars').show();
  $('#score').show();
  $('#score').html($('#percent').html());
  $('#main').css('pointer-events', 'auto');
  if (level == 1) {
    $('#Waves').html('☆ × ' + $.cookie('e_wave'));
    if (star == 2) {
      $('#level-d').html('我が家への道');
    }
      $('#mai').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     } else if (level == 2) {
       $('#Waves').html('☆ × ' + $.cookie('e_wave_t'));
       if (star == 2) {
      $('#level-d').html('世界は廻り続ける');
      }
         $('#edu').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     } else if (level == 3) {
       $('#Waves').html('☆ × ' + $.cookie('e_wave_th'));
       if (star == 2) {
      $('#level-d').html('失われた王国の王女');
      }
      $('#prin').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     } else if (level == 4) {
       $('#Waves').html('☆ × ' + $.cookie('e_wave_f'));
       if (star == 2) {
      $('#level-d').html('天空の花園');
      }
      $('#los').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     } else if (level == 5) {
      $('#Waves').html('☆ × ' + $.cookie('e_wave_fi'));
      if (star == 2) {
      $('#level-d').html('未完成のパズル');
      }
      $('#alive').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     } else if (level == 6) {
      $('#Waves').html('☆ × ' + $.cookie('e_wave_s'));
      if (star == 2) {
      $('#level-d').html('???');
      }
      $('#ef').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     } else if (level == 7) {
      $('#Waves').html('☆ × ' + $.cookie('e_wave_se'));
      if (star == 2) {
      $('#level-d').html('???');
      }
      $('#ef').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     } else {
      $('#cloud').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
     }
}
