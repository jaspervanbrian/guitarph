<?php

namespace Model;

class User
{
	public $username = "";
	public $password = "";
	public $firstName = "";
	public $lastName = "";
	public $gender = "";

	public function __construct($username, $password, $firstName, $lastName, $gender)
	{
		$this->username = $username;
		$this->password = $password;
		$this->firstName = $firstName;
		$this->lastName = $lastName;
		$this->gender = $gender;
	}
	public function save($xml)
	{
		$newUser = $xml->createElement('user');
    $newUser->appendChild($xml->createElement('username', $this->username));    
    $newUser->appendChild($xml->createElement('password', $this->password));
    $newUser->appendChild($xml->createElement('firstName', $this->firstName));
    $newUser->appendChild($xml->createElement('lastName', $this->lastName));
    $newUser->appendChild($xml->createElement('gender', $this->gender));
    $xml->getElementsByTagName('users')->item(0)->appendChild($newUser);
    $test = $xml->save('../db/users.xml');
	}
}