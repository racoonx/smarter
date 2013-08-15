package com.smarter.db;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DBManager {
	private static EntityManagerFactory emf;
	private static EntityManager em;
	static {
		emf = Persistence.createEntityManagerFactory("Smarter");
	    em = emf.createEntityManager();
	}
	
	public static EntityManager getEntityManager() {
		return em;
	}
}
