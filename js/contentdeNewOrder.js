/**
 * Copyright 2012  content.de AG  (email: info[YEAR]@content.de (eg: info2012@content.de))
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

(function ($) {
	$(document).ready(function () {
		$(
			'#orderTypeSelect select[name="new_order[type]"],' +
			'#orderDataOO select[name="new_order[oo_level]"],' +
			'#orderDataGO select[name="new_order[go_level]"],' +
			'#orderDataGO select[name="new_order[go_group]"],' +
			'#orderDataDO select[name="new_order[do_contractor]"]'
		).change(function () {
			switch($('#orderTypeSelect select[name="new_order[type]"]').val())
			{
				case 'oo':
					$('#orderDataOO').show();
					$('#orderDataGO, #orderDataDO').hide();

					if($('#orderDataOO select[name="new_order[oo_level]"]').val().length > 0)
					{
						$('#orderData').show();
					}
					else
					{
						$('#orderData').hide();
					}

					$('#orderDataGO select[name="new_order[go_level]"]').val("");
					$('#orderDataGO select[name="new_order[go_group]"]').val("");
					$('#orderDataDO select[name="new_order[do_contractor]"]').val("");
					
					break;

				case 'go':
					$('#orderDataGO').show();
					$('#orderDataOO, #orderDataDO').hide();

					if(
							$('#orderDataGO select[name="new_order[go_level]"]').val().length > 0
						&&	$('#orderDataGO select[name="new_order[go_group]"]').val().length > 0
					)
					{
						$('#orderData').show();
					}
					else
					{
						$('#orderData').hide();
					}

					$('#orderDataOO select[name="new_order[oo_level]"]').val("");
					$('#orderDataDO select[name="new_order[do_contractor]"]').val("");
					
					break;

				case 'do':
					$('#orderDataDO').show();
					$('#orderDataOO, #orderDataGO').hide();

					if($('#orderDataDO select[name="new_order[do_contractor]"]').val().length > 0)
					{
						$('#orderData').show();
					}
					else
					{
						$('#orderData').hide();
					}

					$('#orderDataOO select[name="new_order[oo_level]"]').val("");
					$('#orderDataGO select[name="new_order[go_level]"]').val("");
					$('#orderDataGO select[name="new_order[go_group]"]').val("");
					
					break;

				default:
					
					$('#orderDataOO select[name="new_order[oo_level]"]').val("");
					$('#orderDataGO select[name="new_order[go_level]"]').val("");
					$('#orderDataGO select[name="new_order[go_group]"]').val("");
					$('#orderDataDO select[name="new_order[do_contractor]"]').val("");
					
					$('#orderDataOO, #orderDataGO, #orderDataDO, #orderData').hide();
			}
		}).change();

		$(
			'#orderDataOO select[name="new_order[oo_level]"],' +
			'#orderDataGO select[name="new_order[go_level]"],' +
			'#orderDataDO select[name="new_order[do_contractor]"],' +
			'#orderData input[name="new_order[max_words]"]'
		).change(function () {
			
			var type = $('#orderTypeSelect select[name="new_order[type]"]').val();
			var wordCount = $('#orderData input[name="new_order[max_words]"]').val();
			var level = '';

			$('#loadingCosts').show();
			
			switch(type)
			{
				case 'oo':
					level = $('#orderDataOO select[name="new_order[oo_level]"]').val();
					break;
				case 'go':
					level = $('#orderDataGO select[name="new_order[go_level]"]').val();
					break;
				case 'do':
					level = $('#orderDataDO select[name="new_order[do_contractor]"]').val();
					break;
			}
			
			$.post(
				ajaxurl,
				{
					'action': 'contentde-calcNewOrder',
					'type': type,
					'level': level,
					'wordCount': wordCount
				},
				function (result) {
					if(result)
					{
						if(result.avail_balance)
						{
							$('#avail_balance').html(result.avail_balance);
						}

						if(result.avail_budget)
						{
							$('#avail_budget_row').show();
							$('#avail_budget').html(result.avail_budget);
						}
						else
						{
							$('#avail_budget_row').hide();
						}

						if(result.order_costs_per_word)
						{
							$('#order_costs_per_word').html(result.order_costs_per_word);
						}

						if(result.order_costs_per_word)
						{
							$('#order_costs').html(result.order_costs);
						}
					}

					$('#loadingCosts').hide();
				},
				'json'
			);
		});
		
		$('#new_order_briefing_template').change(function () {
			var id = $(this).val();

			if(briefings[id] && briefings[id]['content'])
			{
				tinyMCE.get('new_order_description').setContent(briefings[id]['content']);
			}
		});

		$('.add_keyword').live('click', function () {
			$('#keywordContainer').append($('#keywordProtoContainer').html());
			$('#keywordContainer .del_keyword, #keywordContainer .add_keyword').show();
			$('#keywordContainer > div:first .del_keyword').hide();
			$('#keywordContainer > div:not(:last) .add_keyword').hide();
		});

		$('.del_keyword').live('click', function () {
			$(this).parents('.keyword').remove();
			$('#keywordContainer .del_keyword, #keywordContainer .add_keyword').show();
			$('#keywordContainer > div:first .del_keyword').hide();
			$('#keywordContainer > div:not(:last) .add_keyword').hide();
		});
		
		for(var index in keywords)
		{
			$('#keywordProtoContainer .add_keyword').click();
			$('#keywordContainer .keyword:last').val(keywords[index]);
		}
	});
})(jQuery);
