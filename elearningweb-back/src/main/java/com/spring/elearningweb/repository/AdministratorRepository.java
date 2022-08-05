package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {

    @Query("FROM Administrator where username=:username")
    Administrator findStaffByUsername(@Param("username") String username);

    @Transactional
    @Modifying
    @Query(value = "update administrator set password = ?1 where id = ?2", nativeQuery = true)
    void updatePassword(String password, long id);

    @Transactional
    @Modifying
    @Query(value = "update admin set image = ?1 where id = ?2", nativeQuery = true)
    void updateProfileImage(String path, int id);
}
