
function yes(id) {
    return $('#'+id).prop('checked') ? 1 : 0;
}

function val(id) {
  var v = $('#'+id).val();
  if (v==null) return NaN;
  //if (v=='on') return 1;
  return isNaN(parseInt(v)) ? v : parseInt(v);
}

function dropdown(data, reset_value) {
  var s = "";
  if (typeof(reset_value)==='undefined') {
    reset_value = _.keys(data)[0];
  }
  if (data.toString().indexOf('[')===0) {
    // array shows as 0,1
    s += "<select dir='rtl' id='<%- task_id %>' reset_value='"+_.escape(reset_value)+"'>";
    for (var o in data) {
      s += "<option value='"+_.escape(o)+"'>"+_.escape(data[o])+"</option>";
    }
  } else {
    // shows as [object ...
    s += "<select dir='rtl' id='<%- task_id %>' reset_value='"+_.escape(reset_value)+"'>";
    // for array, ignore indices
    for (var o in data) {
      s += "<option value='"+_.escape(data[o])+"'>"+_.escape(data[o])+"</option>";
    }
  }
  s += "</select>";
  return s;
}

function mission_error(mission_id, message, detail) {
    $('#q_'+mission_id+'_err').html(" &mdash; <b class='red'>"+message+"</b>");
    if (detail) {
        $('#q_'+mission_id+'_err').attr("title", detail);
        console.log(detail);
    }
    $('#any_mission_error').show();
}
function clear_mission_error(mission_id) {
    $('#q_'+mission_id+'_err').html("");
    $('#q_'+mission_id+'_err').removeAttr("title");
}

/* adds a mission section to the html; first arg is the parent div;
   second is a map of properties, all required.
   tasks should be a list, with each entry a string (to generate a default=false checkbox)
   or a map with a `label` and the `control`. within the control:
   * `__ID__` will be replaced by the control's ID. 
   * a `reset_value` attribute will set the initial and clean initial value.
  this returns the list of mission ids, for the caller to reference.
*/
function add_mission($parent, mission_data) {
  mission_data.items = {};
  for (var task in mission_data.tasks) {
    mission_data.items['q_'+mission_data.id+'_'+task]=mission_data.tasks[task];
  }
  $parent.append(JST["mission_section"](mission_data));
  score_items[mission_data.id] = function() {
    return mission_data.score(_.keys(mission_data.items), _.partial(mission_error, mission_data.id)); };
  score_items_count[mission_data.id] = function() {
    if (mission_data.count_mission) {
       return mission_data.count_mission(_.keys(mission_data.items));
    } else {
       return score_items[mission_data.id]()!=0;
    }
  };
  return _.keys(mission_data.items);
}


var score_items = {};
var score_items_count = {};
var missions = 0;
var score = 0;

function calculate() {
    score = 0; missions = 0;
    $('#any_mission_error').hide();
    for (var x in score_items) {
        clear_mission_error(x);     
        var score_for_x = score_items[x]();
        score += score_for_x;
        if (isNaN(score_for_x*1)) {
            console.log("WARN: NaN "+score_for_x+" at "+x+"; "+score_items[x]);
            mission_error(x, "Invalid");
        } else {
            var elt = $('#q_'+x+'_s');
            if (score_items_count[x]()) {
                missions++;
            }
            if (score_for_x) {
                elt.html(" &mdash; "+score_for_x+" points");
            } else {
                elt.html("");
            }
        }
    }
    document.getElementById('mission_count').innerHTML = (missions==0 ? "" :
       " &mdash; "+missions+" mission"+(missions!=1?"s":""));
    $('#score').html(isNaN(score) ? "ERR" : score);
}

function save() {
  $('#scores_table').prepend(
    JST["saved_score"]({ 
      team_name: $('#team_name').val(), 
      score: $('#score').html() }) );
    reset();
}

function reset() {
    $('#team_name').html('');

    $('input[type=checkbox]').each(function(){
        $(this).prop("checked", $(this).attr('reset_value')); });
        
    $('input[type!=checkbox]').each(function(){
        $(this).val( $(this).attr('reset_value')); });

    $('select').each(function(){
        $(this).val( $(this).attr('reset_value')); });
        
    calculate();
    
    document.getElementById('scores_section').style.visibility = 
        (document.getElementById('scores_table').innerHTML ? 'visible' : 'hidden')
}

function clear_scores() {
    document.getElementById('scores_table').innerHTML = ''
    document.getElementById('scores_section').style.visibility = 
        (document.getElementById('scores_table').innerHTML ? 'visible' : 'hidden')
}

function initialize() {
    var els = document.getElementsByTagName('input');
    for (var i = 0; i < els.length; i++)
        els[i].onclick = calculate;
    els = document.getElementsByTagName('select');
    for (i = 0; i < els.length; i++)
        els[i].onchange = calculate;
    reset();
}
