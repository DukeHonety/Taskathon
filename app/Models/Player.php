<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $table = 'players';
    // public $timestamps = false;
    const UPDATED_AT = null;
    public function avatar()
    {
        return $this->belongsTo(Avatar::class, 'character');
    }
}
