package com.spring.elearningweb.config;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.spring.elearningweb.service.JwtStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
@Autowired
    private JwtStudentService jwtService;

@Autowired
private JwtTokenUtil jwtTokenUtil;
@Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
    final String tokenHeader = request.getHeader("Authorization");
    String username = null;
    String jwtToken = null;
    // && tokenHeader.startsWith("Bearer")
    logger.info("REQUEST JWT TOKEN: " + tokenHeader);
    if(tokenHeader != null) {
        jwtToken = tokenHeader.substring(7);
        try {
            username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            logger.info("USERNAME: " + username);
        } catch(Exception e) {
            e.printStackTrace();
        }
    } else {
        logger.warn("Invalid JWT Token! JWT Token does not begin with Bearer!");
    }
    if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = this.jwtService.loadUserByUsername(username);
        if(jwtTokenUtil.validateToken(jwtToken, userDetails)) {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(token);
        }
    }
    chain.doFilter(request, response);
}
}
