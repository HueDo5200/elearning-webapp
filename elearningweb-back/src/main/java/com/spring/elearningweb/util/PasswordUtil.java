package com.spring.elearningweb.util;

import org.springframework.security.crypto.bcrypt.BCrypt;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class PasswordUtil {
    public static String encryptPassword(String pwd) {
//        StringBuilder builder = new StringBuilder();
//        MessageDigest digest;
//        try {
//            digest = MessageDigest.getInstance("SHA-256");
//            digest.reset();
//            digest.update(pwd.getBytes());
//            BigInteger in = new BigInteger(1, digest.digest());
//            builder.append(in.toString());
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
//        return builder.toString();
        String hash = BCrypt.hashpw(pwd, BCrypt.gensalt(12));
        return hash;
    }
    public static void main(String[] args) {

    }


}
