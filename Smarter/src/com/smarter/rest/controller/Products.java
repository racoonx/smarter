package com.smarter.rest.controller;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.smarter.db.DBManager;
import com.smarter.db.dbo.Product;

@Controller
@RequestMapping("/products")
public class Products {
	
	@RequestMapping(value="/{id}", method = RequestMethod.GET)
	public @ResponseBody Product getProduct(@PathVariable Long id) {
		EntityManager em = DBManager.getEntityManager();
		em.getTransaction().begin();
		Product p = em.find(Product.class, id);
		em.getTransaction().commit();
		return p;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Product> getAllProducts() {
		EntityManager em = DBManager.getEntityManager();
		em.getTransaction().begin();
		List<Product> p = em.createQuery("SELECT e FROM Product e").getResultList();
		em.getTransaction().commit();
		return p;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody Product addProduct(@RequestBody Product p) {
		EntityManager em = DBManager.getEntityManager();
		em.getTransaction().begin();
		em.persist(p);
		em.getTransaction().commit();
		return p;
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public @ResponseBody Product editProduct(@RequestBody Product p) {
		EntityManager em = DBManager.getEntityManager();
		em.getTransaction().begin();
		em.merge(p);
		em.getTransaction().commit();
		return p;
	}
}
