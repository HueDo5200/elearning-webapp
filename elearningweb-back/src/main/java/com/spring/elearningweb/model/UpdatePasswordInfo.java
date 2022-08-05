package com.spring.elearningweb.model;

import java.io.Serializable;

public class UpdatePasswordInfo implements Serializable {
    private static final long serialVersionUID = 3462458314674450945L;
    private String oldPassword;
    private String newPassword;
    public UpdatePasswordInfo( ) {

    }

    public UpdatePasswordInfo(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
