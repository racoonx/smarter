package com.smarter.db.dbo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name="product_ranks")
@JsonIgnoreProperties(ignoreUnknown = true) 
public class ProductRank {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product productId;
	
	@Column(name="rank")
	private Long rank;
	
	@Column(name="date_modified")
	private Date dateModified;
}
