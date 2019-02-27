<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebController extends Controller
{
    public function homePage() {
        return view('front.home');
    }

    public function loginPage() {
        return view('front.auth.login');
    }

    public function joinPage() {
        return view('front.auth.join');
    }

    public function forgotPasswordPage() {
        return view('front.auth.forgot-password');
    }

    public function profilePage() {
        return view('front.profile');
    }
    
}