package com.smarter.test;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.smarter.db.dbo.Product;

public class Test {
public static void main(String[] args) {
	System.out.println("Begin");
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("Smarter");
    EntityManager em = emf.createEntityManager();
    
    em.getTransaction().begin();
    System.out.println(em.find(Product.class, new Long(1)));
    em.getTransaction().commit();
}
}
