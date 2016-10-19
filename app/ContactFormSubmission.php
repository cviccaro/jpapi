<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContactFormSubmission extends Model
{
	protected $table = 'submissions';

	protected $fillable = ['first_name', 'last_name', 'company', 'email', 'phone', 'contact_time', 'comments', 'division', 'ip'];

	public function getDivisionMarkup()
	{
		$markup = '';

		switch($this->division) {
			case 'main':
				$markup = 'Main Website (www.jpenterprises.com)';
				break;
			default:
				if (!is_null($this->division)) {
					$division = Division::where('name', $this->division)->first();
					if ($division) {
						$markup = $division->display_name ?: $division->name;
						$markup .= ' (' . $division->name . '.jpenterprises.com)';
					}
				}
		}

		return $markup;
	}
}
