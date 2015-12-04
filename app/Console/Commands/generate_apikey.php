<?php
namespace App\Console\Commands;

use App\Blog;
use App\Image;
use App\Key;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class GenerateApiKeyCommand extends Command {

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'generate:apikey';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate an API key for a domain';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
      $domain = $this->argument('domain');
      if (Key::where('domain', $domain)->count()) {
        if ($this->option('regenerate')) {
          $key = Key::where('domain', $domain)->first();
          $this->info('Regenerating API Key for ' . $domain);
          $key->key = create_hash($domain);
          $key->save();
          $this->info('Key regenerated: ' . $key->key);
        }
        else {
          $this->info("Key already generated for domain.  Use --regenerate to regenerate.");
        }
      }
      else {
        $hash = create_hash($domain);
        $this->info('Generating API Key for ' . $domain);
        $key = Key::create([
          'domain' => $domain,
          'key' => $hash
        ]);
        $this->info('Key generated: ' . $key->key);
      }
    }

    /**
     * Set the arguments definition.
     * 
     * @return void
     */
    public function getArguments() {
      return [
        ['domain', InputArgument::REQUIRED, 'Domain to create API key for']
      ];
    }

    /**
     * Set the options definition.
     * 
     * @return void
     */
    public function getOptions() {
      return [
        ['regenerate', 'regenerate', InputOption::VALUE_NONE, 'Regenerate the API key.']
      ];
    }
}