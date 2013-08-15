package com.smarter.test;

import com.smarter.db.DBManager;
import com.smarter.db.dbo.Product;

public class Test {
public static void main(String[] args) {
	DBManager.getEntityManager();
	Product p = new Product();
	p.setName("Test Product");
	DBManager.getEntityManager().getTransaction().begin();
	DBManager.getEntityManager().persist(p);
	DBManager.getEntityManager().getTransaction().commit();
}
}
