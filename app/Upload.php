<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use File;
use Carbon\Carbon;

class Upload extends Model
{
    public static function renderDirectoryTree()
    {
        $base_path = storage_path('app/public');
        $map = [];

        $directories = File::directories($base_path);
        foreach ($directories as $directory) {
            $short_dir = str_replace($base_path . '/', '', $directory);
            $map[$short_dir] = [];
            self::mapSubdirectories($directory, $map[$short_dir]);
        }

        $markup = [];

        foreach($map as $directory => $children) {
        	if (!empty($children)) {
        		$line = '<div class="list-group-item subdirectory"><span class="directory-name">' . $directory . '</span>';
        		$line .= '<button class="btn btn-default expand-button collapsed">';
        		$line .= '<span class="glyphicon glyphicon-chevron-right collapsed-icon"></span>';
        		$line .= '<span class="glyphicon glyphicon-chevron-down expanded-icon"></span>';
        		$line .= '</button>';
        		$line .= '</div>';
        		$line .= self::renderChildTree($children, 1);
        	} else {
        		$line = '<div class="list-group-item subdirectory"><span class="directory-name">' . $directory . '</span></div>';
        	}
        	$markup [] = $line;
        }

        return implode("\r\n", $markup);
    }

    public static function renderChildTree($children, $depth)
    {
    	$markup = [];

    	if (!empty($children)) {
    		foreach($children as $child => $grandchildren) {
    			if (!empty($grandchildren)) {
    				$line = '<div class="list-group-item subdirectory child depth-' . $depth . '"><span class="directory-name">' . $child . '</span>';
    				$line .= '<button class="btn btn-default expand-button collapsed">';
    				$line .= '<span class="glyphicon glyphicon-chevron-right collapsed-icon"></span>';
    				$line .= '<span class="glyphicon glyphicon-chevron-down expanded-icon"></span>';
    				$line .= '</button>';
    				$line .= '</div>';
    				$line .= self::renderChildTree($grandchildren, $depth + 1);
    			} else {
    				$line = '<div class="list-group-item subdirectory child depth-' . $depth . '"><span class="directory-name">' . $child . '</span></div>';
    			}
    			$markup[] = $line;
    		}
    	}

    	return implode('', $markup);
    }

    public static function mapSubdirectories($directory, &$map)
    {
        $subdirectories = File::directories($directory);
        if (!empty($subdirectories)) {
            foreach ($subdirectories as $subdirectory) {
                $sub = str_replace($directory . '/', '', $subdirectory);
                $map[$sub] = [];
                self::mapSubdirectories($subdirectory, $map[$sub]);
            }
        }
    }

    public static function renderFile($file_path) {
    	$filename = File::basename($file_path);

    	$markup = '<h5 class="file-name">' . $filename . '</h5>';
    	$markup .= '<span class="filler"></span>';
    	$markup .= '<div class="file-date">' . Carbon::createFromTimestamp(File::lastModified($file_path))->format('m/j/Y g:ia T') . '</div>';
    	$markup .= '<div class="file-size">' . self::filesize($file_path) . '</div>';

    	return $markup;
    }

    public static function filesize($file_path) {
    	$size = File::size($file_path) / 1024;
    	if ($size > 10000) {
    		return round(($size / 1024), 2) . ' MB';
    	}

    	return round($size, 2) . ' KB';
    }
}
