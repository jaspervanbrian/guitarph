<?php
$xml = new DomDocument();
$xml->preserveWhiteSpace = false;
$xml->formatOutput = true;
$xml->load('../db/products.xml');
	$keyword = "ai";
	$products = $xml->getElementsByTagName('product');
	$jsonKeywords = array();

	$keyword = strtolower($keyword);
	$len = strlen($keyword);
	foreach($products as $product)
	{
		$productName = $product->getElementsByTagName('name')->item(0)->nodeValue;
		if(stristr($keyword, substr($productName, 0, $len))) 
		{
			$jsonKeywords[] = $productName;
		}
	}
	if($len >= 2)
	{
		foreach($products as $product)
		{
			$productName = $product->getElementsByTagName('name')->item(0)->nodeValue;
			if(count($jsonKeywords) > 0)
			{
				foreach($jsonKeywords as $jsonKeyword)
				{
					if(strcmp($jsonKeyword, $productName) != 0)
					{
						if(stripos($productName, $keyword) !== false)
						{
							$jsonKeywords[] = $productName;
						}
					}
				}
			}
			else
			{
				if(stripos($productName, $keyword) !== false)
				{
					$jsonKeywords[] = $productName;
				}
			}
		}
	}
	echo json_encode($jsonKeywords);