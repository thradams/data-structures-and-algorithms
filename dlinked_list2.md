```c
/*
 * Sample 3
 */

#include <stdlib.h>
#include <assert.h>
#include <errno.h>

struct book {
    char title[20];
    struct book* next;
    struct book* prev;
};

struct book_node {
    struct book book;
    struct book_node* next;
    struct book_node* prev;
};


struct books {
    struct book_node* head, * tail;
};

int books_insert_after(struct books* books, struct book_node* node, struct book* new_book)
{
    struct book_node* new_node = calloc(1, sizeof * new_node);
    if (new_node == NULL) return ENOMEM;

    assert(books != NULL);
    assert(node != NULL);
    assert(new_book != NULL);

    new_node->book = *new_book; /*COPIED*/
    new_node->prev = node;

    if (node->next == NULL) {
        books->tail = new_node;
    }
    else {
        new_node->next = node->next;
        node->next->prev = new_node;
    }

    node->next = new_node;
    return 0;
}

int books_insert_before(struct books* books, struct book_node* node, struct book* new_book)
{
    assert(books != NULL);
    assert(node != NULL);
    assert(new_book != NULL);
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    struct book_node* new_node = calloc(1, sizeof * new_node);
    if (new_node == NULL) return ENOMEM;
    new_node->book = *new_book; /*COPIED*/
    new_node->next = node;
    if (node->prev == NULL) {
        books->head = new_node;
    }
    else {
        new_node->prev = node->prev;
        node->prev->next = new_node;
    }
    node->prev = new_node;
    return 0;

}

int books_push_front(struct books* books, struct book* new_book)
{
    assert(books != NULL);
    assert(new_book != NULL);
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    struct book_node* new_node = calloc(1, sizeof * new_node);
    if (new_node == NULL) return ENOMEM;

    if (books->head == NULL) {
        books->head = new_node;
        books->tail = new_node;
    }
    else {
        new_node->next = books->head;
        books->head = new_node;
        books->head->prev = new_node;
    }
    return 0;
}

int books_push_back(struct books* books, const struct book* new_book)
{
    assert(books != NULL);
    assert(new_book != NULL);
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    struct book_node* new_node = calloc(1, sizeof * new_node);
    if (new_node == NULL) return ENOMEM;

    if (books->tail == NULL) {
        books->head = new_node;
        books->tail = new_node;
    }
    else {
        new_node->prev = books->tail;
        books->tail = new_node;
        books->tail->next = new_node;
    }
    return 0;
}

void books_remove(struct books* books, struct book_node* node)
{
    assert(books != NULL);
    assert(node != NULL);

    if (node->prev == NULL)
        books->head = node->next;
    else
        node->prev->next = node->next;

    if (node->next == NULL)
        books->tail = node->prev;
    else
        node->next->prev = node->prev;

    free(node);
}

void books_destroy(struct books* books)
{
    assert(books != NULL);

    struct book_node* it = books->head;
    while (it != NULL) {
        struct book_node* next = it->next;
        free(it);
        it = next;
    }
}


int main(int argc, char* argv[])
{
    struct books books = { 0 };

    struct book book1 = { .title = "book1" };
    books_push_back(&books, &book1 /*COPIED*/);

    struct book book2 = { .title = "book2" };
    books_push_back(&books, &book2 /*COPIED*/);

    books_destroy(&books);
}

```

