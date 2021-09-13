package tenderi.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;
import tenderi.domain.Tenderihome;
import tenderi.repository.TenderihomeRepository;
import tenderi.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link tenderi.domain.Tenderihome}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TenderihomeResource {

    private final Logger log = LoggerFactory.getLogger(TenderihomeResource.class);

    private final TenderihomeRepository tenderihomeRepository;

    public TenderihomeResource(TenderihomeRepository tenderihomeRepository) {
        this.tenderihomeRepository = tenderihomeRepository;
    }

    /**
     * {@code GET  /tenderihomes} : get all the tenderihomes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tenderihomes in body.
     */
    @GetMapping("/tenderihomes")
    public Mono<List<Tenderihome>> getAllTenderihomes() {
        log.debug("REST request to get all Tenderihomes");
        return tenderihomeRepository.findAll().collectList();
    }

    /**
     * {@code GET  /tenderihomes} : get all the tenderihomes as a stream.
     * @return the {@link Flux} of tenderihomes.
     */
    @GetMapping(value = "/tenderihomes", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<Tenderihome> getAllTenderihomesAsStream() {
        log.debug("REST request to get all Tenderihomes as a stream");
        return tenderihomeRepository.findAll();
    }

    /**
     * {@code GET  /tenderihomes/:id} : get the "id" tenderihome.
     *
     * @param id the id of the tenderihome to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tenderihome, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tenderihomes/{id}")
    public Mono<ResponseEntity<Tenderihome>> getTenderihome(@PathVariable Long id) {
        log.debug("REST request to get Tenderihome : {}", id);
        Mono<Tenderihome> tenderihome = tenderihomeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tenderihome);
    }
}
