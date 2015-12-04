
var col = $("#mission_column_1");

add_mission(col, {
  id: "M01", 
  name: "Recycling", 
  img: "./img/fll2015/recycling.jpg", 
  tasks: [
    "Yellows Bin w bar in other team's Safety?",
    "Blues Bin w bar in other team's Safety?",
    "Other team's Yellows Bin w bar in Safety?",
    "Other team's Blues Bin w bar in Safety?",
    ], 
  score: function(q, err) {
      var q4_says_yellows_at_other_teams_safety = (val('q_M04a_1')=="other_team");
      var q4_says_blues_at_other_teams_safety = (val('q_M04a_3')=="other_team");
      var q4_says_yellows_bin_nonempty = (val('q_M04a_0')>0);
      var q4_says_blues_bin_nonempty = (val('q_M04a_2')>0);
      
      if (yes(q[0])) {
        if (!q4_says_yellows_at_other_teams_safety)
          err("M04a mismatch", "Is Yellows Bin in other team's Safety?");
        if (!q4_says_yellows_bin_nonempty)
          err("M04a mismatch", "Is Yellows Bin empty?");
      } else {
        if (q4_says_yellows_at_other_teams_safety && q4_says_yellows_bin_nonempty)
          err("M04a mismatch", "Should score points for yellows bin");
      }
      if (yes(q[1])) {
        if (!q4_says_blues_at_other_teams_safety)
          err("M04a mismatch", "Is Blues Bin in other team's Safety?");
        if (!q4_says_blues_bin_nonempty)
          err("M04a mismatch", "Blues Bin is empty");
      } else {
        if (q4_says_blues_at_other_teams_safety && q4_says_blues_bin_nonempty)
          err("M04a mismatch", "Should score points for Blues Bin");
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
  //return '<img width="16" src="img/misc/plus_white.png" onclick="add_one_to_dropdown(\''+inc_target+'\', \''+(dec_target ? dec_target : '')+'\')"></img>';
  return '<span class="mission_button fa fa-plus inc_button" onclick="add_one_to_dropdown(\''+inc_target+'\', \''+(dec_target ? dec_target : '')+'\')"></span>';
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
function auto_reset_blacks() {
  var sum = 0;
  for (var i=1; i<=5; i++) sum += val('q_M04b_'+i);
  $('#q_M04b_0').val(num_blacks-sum);
  calculate();
}
var auto_reset_blacks_button = '<span class="mission_button fa fa-magic auto_reset_blacks_button" onclick="auto_reset_blacks()"'+
  ' title="Compute blacks in original setup position based on values of other fields."'+
  '></span>';
function update_flowerpot() {
  var old_val = val('q_M04b_3');
  $('#q_M04b_3').val(''+(2-old_val));
  $('#q_M04b_0').val(''+(val('q_M04b_0')+(-2+2*old_val)));
  calculate();
}
add_mission(col, {
  id: "M04b", 
  name: "Sorting - Blacks", 
  img: "./img/fll2015/sorting-blacks.png", 
  tasks: [
    { label: "Blacks in Setup position",
      control: auto_reset_blacks_button + dropdown(_.range(num_blacks+1), num_blacks)
      },
    { label: "Blacks in Sorter Blacks Bin",
      control: inc_button('q_M04b_1','q_M04b_0')+dropdown(_.range(8+1))
      },
    { label: "Blacks in Landfill Bin",
      control: inc_button('q_M04b_2','q_M04b_0')+dropdown(_.range(8+1))
      },
    { label: "Blacks used in Flower Box",
      control: 
        //'<input style="margin-right: 6px;" type="checkbox" id="q_M04b_3_toggle" onclick="update_flowerpot()"/>'
        '<span class="mission_button fa fa-magic" onclick="update_flowerpot()"/>'
        +dropdown([0, 2])
      },
    { label: "Non-penalty Blacks elsewhere",
      control: inc_button('q_M04b_4','q_M04b_0')+dropdown(_.range(8+1))
      },
    { label: "<i>Penalties</i>",
      control: inc_button('q_M04b_5','q_M04b_0')+dropdown(_.range(4+1))
      },
  ], 
  score: function(q, err) {
      var sum = 0;
      for (var i=0; i<=5; i++) sum += val(q[i]);
      if (sum!=num_blacks) {
        err("miscount", "There should always be a total of 12 blacks");
        console.log("Total of "+sum+" non-penalty blacks; expected "+num_blacks);
      } else if (val(q[1])+val(q[2])+val(q[3])+val(q[4])>8) {
        err("miscount", "Max 8 non-penalty blacks");
      } else {
        // check setup sensible
        var min_in_setup = 0, max_in_setup = 0, missions = '';
        // penalties
        min_in_setup += 4-val(q[5]);
        max_in_setup += 4-val(q[5]);
        if (val(q[5])>0) {
            missions += ' penalties';
        }
        // 2 could come from toy planes, unless both are in safety
        if (val('q_M11_0')==2) {
            missions += ' M10';
        } else {
            max_in_setup += 2;
        }
        // 4 will come if building not demolished
        if (yes('q_M10_0')) {
            missions += ' M10';
        } else {
            max_in_setup += 4;
            // might be partially demolished? min_in_setup += 4;
        }
        // 2 more could come from sorter, regardless
        max_in_setup += 2;
        if (missions!="") {
            missions = " still in setup, changed due to "+missions;
        } else {
            missions = " in setup";
        }
        if (val(q[0])<min_in_setup || val(q[0])>max_in_setup) {
          err("miscount", "Expect between "+min_in_setup+" and "+max_in_setup+" still in setup, changed due to "+missions);
        } 
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
  score: function(q, err) {
    if (yes(q[2]) && val(q[1])==0) {
      err("chicken in circle", "The chicken in the small circle implies an animal in a cleared circle.");
    }
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
  score: function(q, err) {
    if (val('q_M04b_3') && !val(q[0])) {
      err("M04b mismatch", "Can't make flower-pot if no toy plane purchased");
    }
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
  score: function(q, err) {
    if (yes(q[0]) && !yes('q_M08_1')) {
      err("M08 mismatch", "Can't make flower-pot without compost");
    } else if (yes(q[0]) && val('q_M11_0')==0) {
      err("M11 mismatch", "Can't make flower-pot without purchasing toy plane");
    } else if (!yes(q[0]) && val('q_M04b_3')>0) {
      err("M04a mismatch", "Can't score for blacks in flower-pot without this mission completed");
    }
    return 40 * yes(q[0]);
  } 
});

