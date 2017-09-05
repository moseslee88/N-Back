package test;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.Assert.*;

import entities.Result;

public class ResultTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Result result = null;

	@Before
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("RDS");
		em = emf.createEntityManager();
	}

	@After
	public void tearDown() throws Exception {
		em.close();
		emf.close();
		result = null;
	}

	@Test
	public void test() {
		boolean pass = true;
		assertEquals(pass, true);
	}
}
