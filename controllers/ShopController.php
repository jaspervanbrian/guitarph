<?php

session_start();

if(!isset($_SESSION['user']))
{
	header("Location: ../index.php");
}

$xml = new DomDocument();
$xml->load('../db/products.xml');

if (isset($_SESSION['user']) && isset($_GET['category'])) {
	$category = $_GET['category'];
	$start = (int)$_GET['start'];
	$end = (int)$_GET['end'];
	$jsonProducts = array();
	if($category == "Home")
	{
		for($i=$start;$i<$end;$i++)
		{
			$xmlProduct = $xml->getElementsByTagName('product')->item($i);
			if($xmlProduct == NULL)
			{
				break;
			}
			else
			{
				$jsonProducts[] = array(
					'category' => $xmlProduct->getElementsByTagName('category')->item(0)->nodeValue,
					'id' => $xmlProduct->getElementsByTagName('id')->item(0)->nodeValue,
					'name' => $xmlProduct->getElementsByTagName('name')->item(0)->nodeValue,
					'description' => $xmlProduct->getElementsByTagName('description')->item(0)->nodeValue,
					'price' => $xmlProduct->getElementsByTagName('price')->item(0)->nodeValue,
					'filename' => $xmlProduct->getElementsByTagName('filename')->item(0)->nodeValue
				);
			}
		}
	}
	else
	{
		$tempProducts = array();
		$products = $xml->getElementsByTagName('product');
		for($i=0;$i<$products->length;$i++)
		{
			$xmlProduct = $products->item($i);
			if($xmlProduct == NULL)
			{
				break;
			}
			if($category == $xmlProduct->getElementsByTagName('category')->item(0)->nodeValue)
			{
				$tempProducts[] = array(
					'category' => $xmlProduct->getElementsByTagName('category')->item(0)->nodeValue,
					'id' => $xmlProduct->getElementsByTagName('id')->item(0)->nodeValue,
					'name' => $xmlProduct->getElementsByTagName('name')->item(0)->nodeValue,
					'description' => $xmlProduct->getElementsByTagName('description')->item(0)->nodeValue,
					'price' => $xmlProduct->getElementsByTagName('price')->item(0)->nodeValue,
					'filename' => $xmlProduct->getElementsByTagName('filename')->item(0)->nodeValue
				);
			}
		}
		for($i=$start;$i<$end;$i++)
		{
			if($tempProducts[$i] == NULL)
			{
				break;
			}
			$jsonProducts[] = $tempProducts[$i];
		}
	}		
	echo json_encode($jsonProducts);
}
else
{
	header("Location: ../index.php");
}

