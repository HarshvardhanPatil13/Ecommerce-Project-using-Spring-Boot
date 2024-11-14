package com.Ecom.e_com.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Ecom.e_com.model.Product;
import com.Ecom.e_com.service.ProductService;

@RestController
@RequestMapping("/")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService pservice;
    
    @RequestMapping("/")
    public String greet()
    {
        return "Hello world";
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts()
    {
         return new ResponseEntity<>(pservice.getAllProducts(),HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> geProduct(@PathVariable int id)
    {
        Product product=pservice.getProduct(id);

        if(product !=null)
        {
            return new ResponseEntity<>( pservice.getProduct(id),HttpStatus.OK);
        }
       else{
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestPart Product product ,@RequestPart MultipartFile imageFile)
    {
        try{

        Product product1 = pservice.addProduct(product,imageFile);
        System.out.println("qty :"+product1.getImageData());

        return new ResponseEntity<>(product1,HttpStatus.CREATED);}

        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/products/{prodId}/image")
    public ResponseEntity<byte[]> getImagebyProductId(@PathVariable int prodId)
    {
        Product product = pservice.getProduct(prodId);
        byte[] imageFile=product.getImageData();

        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(imageFile);
    }
    
    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart Product product, @RequestPart MultipartFile imageFile)
    {
        Product product1;
        try {
            product1 = pservice.updateProduct(id,product,imageFile);
        } catch (IOException e) {
            return new ResponseEntity<>("Product not found",HttpStatus.NOT_FOUND);
        }

        if(product1!=null)
        {
            return new ResponseEntity<>("Product updated",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Product not found",HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id)
    {
        Product p1 = pservice.getProduct(id);
        System.out.println(p1);

        if(p1!=null)
        {
            pservice.deleteProduct(id);
            return new ResponseEntity<>("Product deleted",HttpStatus.OK);

        }
        else{
            return new ResponseEntity<>("Product not found",HttpStatus.NOT_FOUND);
        }

    }
    
    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProduct(@RequestParam String keyword)
    {
        System.out.println("Searching with "+keyword);
        List<Product> products = pservice.searchProducts(keyword);

        return new ResponseEntity<>(products,HttpStatus.OK);
    }
}
