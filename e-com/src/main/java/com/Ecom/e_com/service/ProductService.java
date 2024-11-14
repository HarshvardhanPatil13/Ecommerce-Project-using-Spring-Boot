package com.Ecom.e_com.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Ecom.e_com.model.Product;
import com.Ecom.e_com.repo.ProductRepo;

@Service

public class ProductService {

    @Autowired
    private ProductRepo repo;
    public List<Product> getAllProducts() {
        return repo.findAll();
        
    }
    public Product getProduct(int id) {
       
        return repo.findById(id).orElse(null);
    }
    public Product addProduct(Product product, MultipartFile imageFile) throws IOException{

        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        
        return repo.save(product);
    }

    public Product updateProduct(int id,Product product , MultipartFile imageFile) throws IOException
    {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return repo.save(product);
    }

    public void deleteProduct(int id )
    {
        repo.deleteById(id);
    }
    
    public List<Product> searchProducts(String keyword)
    {
        return repo.searchProducts(keyword);
    }
}