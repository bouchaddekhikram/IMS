package com.gestion.stage.repository;

import java.util.Optional;

import com.gestion.stage.models.ERole;
import com.gestion.stage.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
