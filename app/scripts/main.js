
var col = $("#mission_column_1");

add_mission(col, {
  id: "M01", 
  name: "Recycling", 
  img: "./img/fll2015/recycling.jpg", 
  tasks: [
    "Yellows Bin in other team's Safety?",
    "Blues Bin in other team's Safety?",
    "Other team's Yellows Bin in Safety?",
    "Other team's Blues Bin in Safety?",
    ], 
  score: function(q, err) {
      if ((yes(q[0]) && val('q_M04a_1')!="other_team") || 
              (yes(q[1]) && val('q_M04a_3')!="other_team")) {
          err("M04a mismatch");
      }
      return 60 * (yes(q[0]) + yes(q[1]) + yes(q[2]) + yes(q[3])); 
  } 
});
  
add_mission(col, {
  id: "M02", 
  name: "Methane", 
  img: "./img/fll2015/methane.png", 
  tasks: [
    "In the Truck's Engine Compartment",
    "In the Factory's Power Station",
  ], 
  score: function(q) { return 40 * (yes(q[0]) + yes(q[1])); } 
});

add_mission(col, {
  id: "M03", 
  name: "Transport", 
  img: "./img/fll2015/transport.png", 
  tasks: [
    "Yellow Bin entirely supported by Truck",
    "Yellow Bin completely east of Truck Guide",
  ], 
  score: function(q) { return 50*yes(q[0]) + 60*yes(q[1]); } 
});

function add_one_to_dropdown(inc_target, dec_target) {
  var t = $('#'+inc_target);
  t.val(parseInt(t.val())+1);
  if (dec_target) {
    var t = $('#'+dec_target);
    t.val(parseInt(t.val())-1);
  }
  calculate();
}

function inc_button(inc_target, dec_target) {
  return '<button class="inc_button" onclick="add_one_to_dropdown(\''+inc_target+'\', \''+(dec_target ? dec_target : '')+'\')">+</button>';
}

var num_blues=6;
var num_yellows=9;
add_mission(col, {
  id: "M04a", 
  name: "Sorting - Yellows and Blues", 
  img: "./img/fll2015/sorting-yellows-and-blues.png", 
  tasks: [
    { label: "Yellows in Yellows Bin", 
      control: inc_button("q_M04a_0")+dropdown(_.range(num_yellows+1)) },
    { label: "Yellows Bin location", 
      control: dropdown({ 
        origin: "never in West Transfer", 
        west: "at West Transfer", 
        other_team: "at other team's Safety", 
        misplaced: "misplaced after Transfer" },
        "origin") },
    { label: "Blues in Blues Bin", 
      control: inc_button('q_M04a_2')+dropdown(_.range(num_blues+1)) },
    { label: "Blues Bin location", 
      control: dropdown({ 
        origin: "never in West Transfer", 
        west: "at West Transfer", 
        other_team: "at other team's Safety", 
        misplaced: "misplaced after Transfer" },
        "origin") },
  ], 
  score: function(q) {
    var v1 = val(q[1])=="origin" ? 6 : val(q[1])=="west" ? 7 : 0;
    var v2 = val(q[3])=="origin" ? 6 : val(q[3])=="west" ? 7 : 0;
    return v1*val(q[0])+v2*val(q[2]); 
  } 
});

var num_blacks=12;
add_mission(col, {
  id: "M04b", 
  name: "Sorting - Blacks", 
  img: "./img/fll2015/sorting-blacks.png", 
  tasks: [
    { label: "Blacks in Setup position",
      control: dropdown(_.range(num_blacks+1), num_blacks)
      },
    { label: "Blacks in Sorter Blacks Bin",
      control: inc_button('q_M04b_1','q_M04b_0')+dropdown(_.range(num_blacks+1))
      },
    { label: "Blacks in Landfill Bin",
      control: inc_button('q_M04b_2','q_M04b_0')+dropdown(_.range(num_blacks+1))
      },
    { label: "Blacks used in Flower Box",
      control: inc_button('q_M04b_3','q_M04b_0')+dropdown(_.range(2+1))
      },
    { label: "Non-penalty Blacks elsewhere",
      control: inc_button('q_M04b_4','q_M04b_0')+dropdown(_.range(num_blacks+1))
      },
    { label: "<i>Penalties</i>",
      control: inc_button('q_M04b_5','q_M04b_0')+dropdown(_.range(4+1))
      },
  ], 
  score: function(q, err) {
      var sum = 0;
      for (var i=0; i<=5; i++) sum += val(q[i]);
      if (sum!=num_blacks) {
        err("miscount");
        console.log("Total of "+sum+" non-penalty blacks; expected "+num_blacks);
      }
      return 8*(val(q[0]) + val(q[3]))
        +3*(val(q[1]) + val(q[2]))
        -8*(val(q[4]) + val(q[5])); 
  },
  count_mission: function(q) { return val(q[1])+val(q[2])+val(q[3]) > 0; }
});

add_mission(col, {
  id: "M05", 
  name: "Careers", 
  img: "./img/fll2015/careers.png", 
  tasks: [
    "Person in Sorting Area",
  ], 
  score: function(q) { return 60 * yes(q[0]); } 
});



col = $("#mission_column_2");

add_mission(col, {
  id: "M06", 
  name: "Scrap Cars", 
  img: "./img/fll2015/scrap-car.png", 
  tasks: [
    "Engine/Windshield installed", 
    "Folded in East Transfer",
  ], 
  score: function(q) {
    if (yes(q[0]) && yes(q[1])) {
      return NaN;
    } 
    return 65 * yes(q[0]) + 50 * yes(q[1]); } 
});

add_mission(col, {
  id: "M07", 
  name: "Cleanup", 
  img: "./img/fll2015/cleanup.png", 
  tasks: [
    { label: "Plastic Bags in Safety",
      control: inc_button("q_M07_0")+dropdown([ 0,1,2 ])
      },
    { label: "Animals completely in cleared circles",
      control: inc_button("q_M07_1")+dropdown([ 0,1,2,3 ])
      },
    "Chicken in small circle",
  ], 
  score: function(q) {
    return 30 * val(q[0]) + 20 * val(q[1]) + 35 * yes(q[2]); } 
});

add_mission(col, {
  id: "M08", 
  name: "Composting", 
  img: "./img/fll2015/composting.png", 
  tasks: [
    "Compost ejected", 
    "Compost in Safety",
  ], 
  score: function(q) {
    if (yes(q[1])) return 80;
    return 60 * yes(q[0]);
  } 
});

add_mission(col, {
  id: "M09", 
  name: "Salvage", 
  img: "./img/fll2015/salvage.png", 
  tasks: [
    "Valuables in Safety", 
  ], 
  score: function(q) {
    return 60 * yes(q[0]);
  } 
});

add_mission(col, {
  id: "M10", 
  name: "Demolition", 
  img: "./img/fll2015/demolition.png", 
  tasks: [
    "Building completely demolished", 
  ], 
  score: function(q) {
    return 85 * yes(q[0]);
  } 
});

add_mission(col, {
  id: "M11", 
  name: "Purchasing", 
  img: "./img/fll2015/purchasing.png", 
  tasks: [
    { label: "Toy Planes in Safety",
      control: inc_button("q_M11_0")+dropdown([ 0,1,2 ])
      },
  ], 
  score: function(q) {
    return 40 * val(q[0]);
  } 
});

add_mission(col, {
  id: "M12", 
  name: "Repurposing", 
  img: "./img/fll2015/repurposing.png", 
  tasks: [
    "Compost in Toy Plane packaging"
  ], 
  score: function(q) {
    return 40 * yes(q[0]);
  } 
});

