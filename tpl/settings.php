<?php
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

function contentdeTemplateSettings($aParams) { ?>

<div class="wrap">

	<h2>content.de Zugangsdaten</h2>

	<?php echo contentdeLogic::showErrors(); ?>
	<?php echo contentdeLogic::showSuccesses(); ?>

	<form action="<?php echo contentdeHelper::getPageUrl('settings', array('noheader' => 1)); ?>" method="post">
		<table class="form-table">
			<tr>
				<th>E-Mail / API-Key</th>
				<td><input type="text" name="clogin" class="regular-text contentde-input" value="<?php echo CONTENTDE_LOGIN ?>" /></td>
			</tr>
			<tr>
				<th>Passwort</th>
				<td><input type="password" name="cpassword" class="regular-text contentde-input" value="<?php echo CONTENTDE_PASSWORD ?>" /></td>
			</tr>
			<tr>
				<th></th>
				<td>
					<?php if(CONTENTDE_HAS_LOGIN_DATA): ?>
					<input type="submit" name="save_login_data" value="&Auml;ndern" class="button-primary" />
					<input type="submit" name="clear_login_data" value="Zugangsdaten entfernen" class="button-primary" />
					<?php else: ?>
					<input type="submit" name="save_login_data" value="Speichern" class="button-primary" />
					<?php endif; ?>
				</td>
			</tr>
		</table>
	</form>
</div>

<?php } ?>