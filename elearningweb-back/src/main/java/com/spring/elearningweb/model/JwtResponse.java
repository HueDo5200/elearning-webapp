package com.spring.elearningweb.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 3462458314678830945L;
    private  String jwtToken;
    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }
    public String getJwtToken() {
        return this.jwtToken;
    }
}
