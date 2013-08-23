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
		Product p = null;
		try {
			em.getTransaction().begin();
			p = em.find(Product.class, id);
			em.getTransaction().commit();
		} catch (Throwable e) {
			em.getTransaction().rollback();
		}
		return p;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Product> getAllProducts() {
		EntityManager em = DBManager.getEntityManager();
		List<Product> p = null;
		try {
			em.getTransaction().begin();
			p = em.createQuery("SELECT e FROM Product e").getResultList();
			em.getTransaction().commit();
		} catch (Throwable e) {
			em.getTransaction().rollback();
		}
		return p;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody Product addProduct(@RequestBody Product p) {
		EntityManager em = DBManager.getEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(p);
			em.getTransaction().commit();
		} catch (Throwable e) {
			em.getTransaction().rollback();
		}
		return p;
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public @ResponseBody Product editProduct(@RequestBody Product p) {
		EntityManager em = DBManager.getEntityManager();
		try {
			em.getTransaction().begin();
			em.merge(p);
			em.getTransaction().commit();
		} catch (Throwable e) {
			em.getTransaction().rollback();
		}
		return p;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void deleteProduct(@PathVariable("id") Long id) {
		EntityManager em = DBManager.getEntityManager();
		try {
			Product p = em.find(Product.class, id);
			em.getTransaction().begin();
			em.remove(p);
			em.getTransaction().commit();
		} catch (Throwable e) {
			em.getTransaction().rollback();
		}
	}
}
