(function($) {
	
	logFile = $('#deploy_log').data('logfile');
	
	var deploy = {
		showlog: function (selector, logfile) {
			$.get('naut/getlog', {logfile: logFile, randval: Math.random()},
				function(data){
					$(selector).html(data);
				}
			);
		},
		
		start: function() {

			var data = {
				'environment': $('#environment').val(),
				'sha': $('#sha').val(),
				'logfile': $('#logfile').val(),
				'project': $('#project').val(),
			}

			$.post('naut/deploy', data, function(data) {
				$('#deploy_action').html(data);
				setInterval(function(){deploy.showlog("#deploy_log", logFile);}, 2000);
			}).error(function(xhr) {
				$('#deploy_log').html(xhr.responseText);
			});
		}
	}

	$(document).ready(function(){
		if($('#Form_DeployForm_BuildName').val() === '') {
			$('#Form_DeployForm_action_doDeploy').attr('disabled', true);
		}
		$('#Form_DeployForm_BuildName').change(function(){
			if($('#Form_DeployForm_BuildName').val() === '') {
				$('#Form_DeployForm_action_doDeploy').attr('disabled', true);
				return;
			}
			$('#Form_DeployForm_action_doDeploy').attr('disabled', false);
		})
		$('#Form_DeployForm_action_doDeploy').click(function() {
			return confirm('Are you sure that you want to deploy?');
		});
		
		
		if($('#deploy_log').length) {
			deploy.start();
		}

		$('.project-branch > h3').click(function() {
			var $project = $(this).parent();
			if($project.hasClass('open')) $project.removeClass('open');
			else $project.addClass('open');
		})

		$('a.update-repository').click(function(e){
			e.preventDefault();

			$(this).attr('disabled', 'disabled');
			$(this).html('Fetching');
			$(this).toggleClass('loading');
			$.get($(this).attr('href'), function(data){
				location.reload();
			});
			
		});
	});
}(jQuery));