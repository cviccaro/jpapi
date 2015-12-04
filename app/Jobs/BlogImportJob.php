<?php
namespace App\Jobs;

use Pheanstalk\Pheanstalk;

class BlogImportJob extends Job {
	function __construct() {
		$this->function = 'import_blogs';
	}
}

$queue = new Pheanstalk_Pheanstalk('127.0.0.1');
$job_data = json_encode(new BlogImportJob());

$queue->useTube('blogImport')->put($job_data);