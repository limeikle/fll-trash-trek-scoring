function yes(a){return $("#"+a).prop("checked")?1:0}function val(a){var b=$("#"+a).val();return null==b?0/0:isNaN(parseInt(b))?b:parseInt(b)}function dropdown(a,b){var c="";if("undefined"==typeof b&&(b=_.keys(a)[0]),0===a.toString().indexOf("[")){c+="<select dir='rtl' id='<%- task_id %>' reset_value='"+_.escape(b)+"'>";for(var d in a)c+="<option value='"+_.escape(d)+"'>"+_.escape(a[d])+"</option>"}else{c+="<select dir='rtl' id='<%- task_id %>' reset_value='"+_.escape(b)+"'>";for(var d in a)c+="<option value='"+_.escape(a[d])+"'>"+_.escape(a[d])+"</option>"}return c+="</select>"}function mission_error(a,b,c){$("#q_"+a+"_err").html(" &mdash; <b class='red'>"+b+"</b>"),c&&($("#q_"+a+"_err").attr("title",c),console.log(c)),$("#any_mission_error").show()}function clear_mission_error(a){$("#q_"+a+"_err").html(""),$("#q_"+a+"_err").removeAttr("title")}function add_mission(a,b){b.items={};for(var c in b.tasks)b.items["q_"+b.id+"_"+c]=b.tasks[c];return a.append(JST.mission_section(b)),score_items[b.id]=function(){return b.score(_.keys(b.items),_.partial(mission_error,b.id))},score_items_count[b.id]=function(){return b.count_mission?b.count_mission(_.keys(b.items)):0!=score_items[b.id]()},_.keys(b.items)}function calculate(){score=0,missions=0,$("#any_mission_error").hide();for(var a in score_items){clear_mission_error(a);var b=score_items[a]();if(score+=b,isNaN(1*b))console.log("WARN: NaN "+b+" at "+a+"; "+score_items[a]),mission_error(a,"Invalid");else{var c=$("#q_"+a+"_s");score_items_count[a]()&&missions++,c.html(b?" &mdash; "+b+" points":"")}}document.getElementById("mission_count").innerHTML=0==missions?"":" &mdash; "+missions+" mission"+(1!=missions?"s":""),$("#score").html(isNaN(score)?"ERR":score)}function save(){$("#scores_table").prepend(JST.saved_score({team_name:$("#team_name").val(),score:$("#score").html()})),reset()}function reset(){$("#team_name").html(""),$("input[type=checkbox]").each(function(){$(this).prop("checked",$(this).attr("reset_value"))}),$("input[type!=checkbox]").each(function(){$(this).val($(this).attr("reset_value"))}),$("select").each(function(){$(this).val($(this).attr("reset_value"))}),calculate(),document.getElementById("scores_section").style.visibility=document.getElementById("scores_table").innerHTML?"visible":"hidden"}function clear_scores(){document.getElementById("scores_table").innerHTML="",document.getElementById("scores_section").style.visibility=document.getElementById("scores_table").innerHTML?"visible":"hidden"}function initialize(){for(var a=document.getElementsByTagName("input"),b=0;b<a.length;b++)a[b].onclick=calculate;for(a=document.getElementsByTagName("select"),b=0;b<a.length;b++)a[b].onchange=calculate;reset()}var score_items={},score_items_count={},missions=0,score=0;