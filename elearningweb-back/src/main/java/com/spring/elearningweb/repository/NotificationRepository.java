package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
