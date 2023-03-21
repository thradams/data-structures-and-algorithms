```c

#include <stdlib.h>
#include <assert.h>
#include <string.h>
#include <stdio.h>
#include <errno.h>

struct book {
    char title[10];
};

struct book_list_node {
    struct book data;
    struct book_list_node* next;
};

struct book_list {
    struct book_list_node* head, * tail;
};

int book_list_append(struct book_list* list, struct book* b)
{
    struct book_list_node* node = calloc(1, sizeof * node);
    if (node == NULL) return ENOMEM;

    node->data = *b;

    if (list->head == NULL) {
        list->head = node;
        list->tail = node;
    }
    else {
        list->tail->next = node;
        list->tail = node;
    }
    return 0;
}

/*alternative insert*/
int book_list_append_title(struct book_list* list, const char* title)
{
    struct book_list_node* node = calloc(1, sizeof(struct book_list_node));
    if (node == NULL) return ENOMEM;

    if (snprintf(node->data.title, sizeof node->data.title, "%s", title) >= sizeof node->data.title)
    {
        free(node);
        return ERANGE; /*title too big*/
    }

    if (list->head == NULL) {
        list->head = node;
        list->tail = node;
    }
    else {
        list->tail->next = node;
        list->tail = node;
    }
    return 0;
}


void book_list_destroy(struct book_list* list)
{
    struct book_list_node* it = list->head;
    while (it != NULL) {
        struct book_list_node* next = it->next;
        free(it);
        it = next;
    }
}


int main(int argc, char* argv[])
{
    struct book_list list = { 0 };
    struct book book = { .title = "book1" };
    book_list_append(&list, &book /*COPIED*/);
    
    book_list_append_title(&list, "book 2");

    book_list_destroy(&list);
}

```
