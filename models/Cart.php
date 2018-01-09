<?php

namespace Model;
/**
* 
*/
class Cart
{
	public function add($xml, $username, $product_id, $quantity)
	{
		$carts = $xml->getElementsByTagName('cart');
		if($carts->length == 0)
		{
			$newCart = $xml->createElement('cart');
			$newCart->appendChild($xml->createElement('username', $username));
			$products = $newCart->appendChild($xml->createElement('product'));
			$products->appendChild($xml->createElement('product_id', $product_id));
			$products->appendChild($xml->createElement('quantity', $quantity));
			$xml->getElementsByTagName('carts')->item(0)->appendChild($newCart);
			$test = $xml->save('../db/carts.xml');
		}
		else
		{
			$usernameFlag = 0;
			foreach($carts as $cart)
			{
				if($username == $cart->getElementsByTagName('username')->item(0)->nodeValue)
				{
					$usernameFlag = 1;
				}
				if($usernameFlag == 1)
				{
					$productsFlag = 0;
					$products = $cart->getElementsByTagName('product');
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
							$test = $xml->save('../db/carts.xml');
							break;
						}
					}
					if($productsFlag == 0)
					{
						$newProduct = $cart->appendChild($xml->createElement('product'));
						$newProduct->appendChild($xml->createElement('product_id', $product_id));
						$newProduct->appendChild($xml->createElement('quantity', $quantity));
						$test = $xml->save('../db/carts.xml');
					}
					break;
				}
			}
			if($usernameFlag == 0)
			{
				$newCart = $xml->createElement('cart');
				$newCart->appendChild($xml->createElement('username', $username));
				$products = $newCart->appendChild($xml->createElement('product'));
				$products->appendChild($xml->createElement('product_id', $product_id));
				$products->appendChild($xml->createElement('quantity', $quantity));
				$xml->getElementsByTagName('carts')->item(0)->appendChild($newCart);
				$test = $xml->save('../db/carts.xml');
			}
		}
	}
	public function getCart($xml, $username)
	{
		$productsXml = new \DomDocument();
		$productsXml->preserveWhiteSpace = false;
		$productsXml->formatOutput = true;
		$productsXml->load('../db/products.xml');

		$carts = $xml->getElementsByTagName('cart');
		$jsonCart = array();
		if($carts->length == 0)
		{
			return $jsonCart;
		}
		else
		{
			$usernameFlag = 0;
			foreach($carts as $cart)
			{
				if($username == $cart->getElementsByTagName('username')->item(0)->nodeValue)
				{
					$usernameFlag = 1;
				}
				if($usernameFlag == 1)
				{
					$myProducts = $cart->getElementsByTagName('product');
					foreach($myProducts as $myProduct)
					{
						$product_id = $myProduct->getElementsByTagName('product_id')->item(0)->nodeValue;
						$qty = (int)$myProduct->getElementsByTagName('quantity')->item(0)->nodeValue;
						$products = $productsXml->getElementsByTagName('product');
						foreach($products as $product)
						{
							if(strcmp($product_id, $product->getElementsByTagName('id')->item(0)->nodeValue) == 0)
							{
								$subtotal = ((int)$product->getElementsByTagName('price')->item(0)->nodeValue) * $qty;
								$jsonCart[] = array(
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
					return $jsonCart;
				}
			}
			return $jsonCart;
		}
	}
	public function getCartLength($xml, $username)
	{
		$carts = $xml->getElementsByTagName('cart');
		if($carts->length == 0)
		{
			return 0;
		}
		else
		{
			$usernameFlag = 0;
			foreach($carts as $cart)
			{
				if($username == $cart->getElementsByTagName('username')->item(0)->nodeValue)
				{
					$usernameFlag = 1;
				}
				if($usernameFlag == 1)
				{
					$productsFlag = 0;
					$products = $cart->getElementsByTagName('product');
					return (int)$products->length;
				}
			}
			if($usernameFlag == 0)
			{
				return 0;
			}
		}
	}
	public function delete($xml, $username, $product_id)
	{
		$carts = $xml->getElementsByTagName('cart');
		$usernameFlag = 0;
		foreach($carts as $cart)
		{
			if($username == $cart->getElementsByTagName('username')->item(0)->nodeValue)
			{
				$products = $cart->getElementsByTagName('product');
				foreach($products as $product)
				{
					if($product_id == $product->getElementsByTagName('product_id')->item(0)->nodeValue)
					{
						$cart->removeChild($product);
						break;
					}
				}
				break;
			}
		}
		$test = $xml->save('../db/carts.xml');
	}
	public function checkout($xml, $username)
	{
		$productsXml = new \DomDocument();
		$productsXml->preserveWhiteSpace = false;
		$productsXml->formatOutput = true;
		$productsXml->load('../db/products.xml');

		$carts = $xml->getElementsByTagName('cart');
		$jsonCart = array();
		foreach($carts as $cart)
		{
			if($username == $cart->getElementsByTagName('username')->item(0)->nodeValue)
			{
				$myProducts = $cart->getElementsByTagName('product');
				foreach($myProducts as $myProduct)
				{
					$product_id = $myProduct->getElementsByTagName('product_id')->item(0)->nodeValue;
					$qty = (int)$myProduct->getElementsByTagName('quantity')->item(0)->nodeValue;
					$products = $productsXml->getElementsByTagName('product');
					foreach($products as $product)
					{
						if(strcmp($product_id, $product->getElementsByTagName('id')->item(0)->nodeValue) == 0)
						{
							$subtotal = ((int)$product->getElementsByTagName('price')->item(0)->nodeValue) * $qty;
							$jsonCart[] = array(
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
				$xml->getElementsByTagName('carts')->item(0)->removeChild($cart);
				$xml->save('../db/carts.xml');
			}
		}
		return $jsonCart;
	}
}