<?php

namespace App\Http\Controllers;

use App\Work;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class WorkController extends Controller
{

    const MODEL = "App\Work";

    use RESTActions;

    public function recent(Request $request)
    {
        $m = self::MODEL;

        $skip = $request->input('skip', 0);

        $count = $m::all()->count();

        $work = $m::orderBy('created_at', 'desc')->take(6)->skip($skip)->get();

        return $this->respond('done', [
            'work' => $work,
            'remaining' => max(0, $count - 6 - $skip),
            'total' => $count,
        ]);
    }

    public function getFromUri(Request $request, $string)
    {
        $m = self::MODEL;

        $model = $m::where('uri', $string)->first();
        if (is_null($model)) {
            return $this->respond('not_found');
        }
        return $this->respond('done', $model);
    }

    public function paged(Request $request)
    {
        $created_at = 0;

        $current_page = $request->input('current_page', 1) - 1;
        $length = $request->input('length', 15);
        $order_by = $request->input('order_by', 'updated_at');
        $descending = $request->input('descending', 'true') === 'true';

        $work = Work::where('created_at', '>', $created_at)
            ->get();

        $work = $work->sortBy(function ($work) use ($order_by) {
            switch ($order_by) {
                case 'updated_at':
                case 'created_at':
                    return \Carbon\Carbon::parse($work->{$order_by})->timestamp;
                    break;
                default:
                    return $work->{$order_by};
            }
        }, SORT_REGULAR, $descending);

        $count = $work->count();

        $paged = $work->slice($current_page * $length, $length)->all();
        $paginator = new Paginator($paged, $count, $length);
        //$paginator = Paginator::make($paged, $count, $length);

        $json = $paginator->toArray();
        $json['current_page'] = $current_page + 1;
        $json['from'] = $current_page * $length;
        $json['to'] = ($json['from']) + $length;

        if ($count !== 0 && $json['from'] === 0) {
            $json['from'] = 1;
        }
        $data = [];
        foreach ($json['data'] as $datum) {
            $data[] = $datum;
        }
        $json['data'] = $data;

        return $this->respond('done', $json);
    }
}
