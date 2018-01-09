<?php

namespace Model;
/**
* 
*/
class Wish
{
	public function add($xml, $username, $product_id, $quantity)
	{
		$wishes = $xml->getElementsByTagName('wish');
		if($wishes->length == 0)
		{
			$newWish = $xml->createElement('wish');
			$newWish->appendChild($xml->createElement('username', $username));
			$products = $newWish->appendChild($xml->createElement('product'));
			$products->appendChild($xml->createElement('product_id', $product_id));
			$products->appendChild($xml->createElement('quantity', $quantity));
			$xml->getElementsByTagName('wishes')->item(0)->appendChild($newWish);
			$test = $xml->save('../db/wishes.xml');
		}
		else
		{
			$usernameFlag = 0;
			foreach($wishes as $wish)
			{
				if($username == $wish->getElementsByTagName('username')->item(0)->nodeValue)
				{
					$usernameFlag = 1;
				}
				if($usernameFlag == 1)
				{
					$productsFlag = 0;
					$products = $wish->getElementsByTagName('product');
					foreach($products as $product)
					{
						if($product_id == $product->getElementsByTagName('product_id')->item(0)->nodeValue)
						{
							$productsFlag = 1;
						}
						if($productsFlag == 1)
						{
							$oldQty = (int)$product->getElementsByTagName('quantity')->item(0)->nodeValue;
							$product->removeChild($product->getElementsByTagName('quantity')->item(0));
							$newQty = $oldQty + $quantity;
							$product->appendChild($xml->createElement('quantity', (string)$newQty));
							$test = $xml->save('../db/wishes.xml');
							break;
						}
					}
					if($productsFlag == 0)
					{
						$newProduct = $wish->appendChild($xml->createElement('product'));
						$newProduct->appendChild($xml->createElement('product_id', $product_id));
						$newProduct->appendChild($xml->createElement('quantity', $quantity));
						$test = $xml->save('../db/wishes.xml');
					}
					break;
				}
			}
			if($usernameFlag == 0)
			{
				$newWish = $xml->createElement('wish');
				$newWish->appendChild($xml->createElement('username', $username));
				$products = $newWish->appendChild($xml->createElement('product'));
				$products->appendChild($xml->createElement('product_id', $product_id));
				$products->appendChild($xml->createElement('quantity', $quantity));
				$xml->getElementsByTagName('wishes')->item(0)->appendChild($newWish);
				$test = $xml->save('../db/wishes.xml');
			}
		}
	}
	public function getWish($xml, $username)
	{
		$productsXml = new \DomDocument();
		$productsXml->preserveWhiteSpace = false;
		$productsXml->formatOutput = true;
		$productsXml->load('../db/products.xml');

		$wishes = $xml->getElementsByTagName('wish');
		$jsonWish = array();
		if($wishes->length == 0)
		{
			return $jsonWish;
		}
		else
		{
			$usernameFlag = 0;
			foreach($wishes as $wish)
			{
				if($username == $wish->getElementsByTagName('username')->item(0)->nodeValue)
				{
					$usernameFlag = 1;
				}
				if($usernameFlag == 1)
				{
					$myWishes = $wish->getElementsByTagName('product');
					foreach($myWishes as $myWish)
					{
						$product_id = $myWish->getElementsByTagName('product_id')->item(0)->nodeValue;
						$qty = (int)$myWish->getElementsByTagName('quantity')->item(0)->nodeValue;
						$products = $productsXml->getElementsByTagName('product');
						foreach($products as $product)
						{
							if(strcmp($product_id, $product->getElementsByTagName('id')->item(0)->nodeValue) == 0)
							{
								$subtotal = ((int)$product->getElementsByTagName('price')->item(0)->nodeValue) * $qty;
								$jsonWish[] = array(
									'category' => $product->getElementsByTagName('category')->item(0)->nodeValue,
									'id' => $product->getElementsByTagName('id')->item(0)->nodeValue,
									'name' => $product->getElementsByTagName('name')->item(0)->nodeValue,
									'description' => $product->getElementsByTagName('description')->item(0)->nodeValue,
									'price' => $product->getElementsByTagName('price')->item(0)->nodeValue,
									'filename' => $product->getElementsByTagName('filename')->item(0)->nodeValue,
									'quantity' => (string)$qty,
									'subtotal' => (string)$subtotal
								);
								break;
							}
						}
					}
					return $jsonWish;
				}
			}
			return $jsonWish;
		}
	}
	public function delete($xml, $username, $product_id)
	{
		$wishes = $xml->getElementsByTagName('wish');
		$usernameFlag = 0;
		foreach($wishes as $wish)
		{
			if($username == $wish->getElementsByTagName('username')->item(0)->nodeValue)
			{
				$products = $wish->getElementsByTagName('product');
				foreach($products as $product)
				{
					if($product_id == $product->getElementsByTagName('product_id')->item(0)->nodeValue)
					{
						$wish->removeChild($product);
						break;
					}
				}
				break;
			}
		}
		$test = $xml->save('../db/wishes.xml');
	}
}