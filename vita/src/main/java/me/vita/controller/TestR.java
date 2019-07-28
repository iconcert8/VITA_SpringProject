package me.vita.controller;

import org.rosuda.REngine.Rserve.RConnection;

public class TestR {

	public static void main(String[] args) {
		RConnection c = null;
		try {
			c = new RConnection();
			
			c.eval("library(ggplot2)");
			c.eval("x = c(\"a\", \"a\", \"b\", \"c\")");
			String[] x = c.eval("x").asStrings();
			for(String a : x) {
				System.out.println(a);
			}
			
			c.eval("y = c(1,1,2,3)");
			int[] y = c.eval("y").asIntegers();
			for(int b : y) {
				System.out.println(b);
			}
			
			c.eval("png(filename = \"c:/upload/test2.png\")");
			c.eval("hist(y)");
			c.eval("dev.off()");
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
}
