<html>
	<head>
		<link href="<?php print url('assets/css/bootstrap.min.css'); ?>" type="text/css" rel="stylesheet" />
		<style type="text/css">
			header {
				margin-bottom: 24px;
			}
			.logo {
				position: relative;
				top: 8px;
			}
			.table {
				margin-top: 36px;
			}
			.comments .field-value {
					word-break: break-all;
				  word-wrap: break-word;
				  white-space: pre-wrap;
			}
			td.field-name {
				min-width: 215px;
			}
		</style>
	</head>
	<body>
		<header class="container">
			<div class="row">
				<div class="logo col-md-2">
					<img src="<?php print url('/assets/images/logo.png'); ?>" title="JP Enterprises" />
				</div>
				<h2 class="col-md-10">Contact Form Submission</h2>
			</div>
		</header>
		<div class="container content">
			<p>A new submission to the contact form has been received.</p>
			<table class="table table-bordered table-striped submission-table">
				<tbody>
					<tr>
						<td class="field-name">Source Website</td>
						<td class="field-value">{!! $submission->getDivisionMarkup() !!}</td>
					</tr>
					<tr>
						<td class="field-name">Date</td>
						<td class="field-value">{{ $submission->created_at->format('F j, Y g:ma T') }}</td>
					</tr>
					<tr>
						<td class="field-name">Name</td>
						<td class="field-value">{{ $submission->first_name . ' ' . $submission->last_name }}</td>
					</tr>
					<tr>
						<td class="field-name">Company</td>
						<td class="field-value">{{ $submission->company }}</td>
					</tr>
					<tr>
						<td class="field-name">Phone</td>
						<td class="field-value">{{ $submission->phone }}</td>
					</tr>
					<tr>
						<td class="field-name">Email Address</td>
						<td class="field-value"><a href="mailto:{{ $submission->email }}">{{ $submission->email }}</a></td>
					</tr>
					<tr>
						<td class="field-name">Best Time to Contact Them</td>
						<td class="field-value">{{ $submission->contact_time }}</td>
					</tr>
					<tr class="comments">
						<td class="field-name">Comments</td>
						<td class="field-value">{{ $submission->comments }}</td>
					</tr>
				</tbody>
			</table>
			<p class="small help-block">This email was generated automatically.  Do not reply.</p>
			<p>
				Thanks,<br />
					JP Enterprises.com
			</p>
		</div>
	</body>
</html>